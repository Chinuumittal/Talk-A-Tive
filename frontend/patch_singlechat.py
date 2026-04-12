import re

with open('src/components/miscellaneous/SingleChat.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add hook initialization
hook_pattern = r'const \[isTyping, setIsTyping\] = useState\(false\);'
hook_replacement = 'const [isTyping, setIsTyping] = useState(false);\n  const [mediaLoading, setMediaLoading] = useState(false);'
text = re.sub(hook_pattern, hook_replacement, text)

# 2. Add imports
import_pattern = r"import \{ ArrowBackIcon \} from '@chakra-ui/icons';"
import_replacement = "import { ArrowBackIcon, AttachmentIcon } from '@chakra-ui/icons';\nimport { InputGroup, InputRightElement } from '@chakra-ui/react';"
text = re.sub(import_pattern, import_replacement, text)

# 3. Add postMedia function before useEffect
post_media_fn = """  const postMedia = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast({
        title: "Please select an image or video file",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setMediaLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "dwr8c1dkd");

    const endpoint = file.type.startsWith("video/") 
        ? "https://api.cloudinary.com/v1_1/dwr8c1dkd/video/upload"
        : "https://api.cloudinary.com/v1_1/dwr8c1dkd/image/upload";

    fetch(endpoint, {
      method: "post",
      body: data,
    })
    .then((res) => res.json())
    .then(async (data) => {
      const mediaUrl = data.secure_url || data.url;
      const messageType = file.type.startsWith("video/") ? "video" : "image";
      
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const resData = await axios.post(
          "/api/message",
          {
            content: mediaUrl,
            chatId: selectedChat._id,
            messageType: messageType,
          },
          config
        );

        socket.emit("new message", resData.data);
        setMessages((prevMessages) => [...prevMessages, resData.data]);
        setFetchAgain(!fetchAgain);
        setMediaLoading(false);
      } catch (error) {
        toast({ title: "Failed to send media", status: "error", duration: 5000, isClosable: true, position: "bottom" });
        setMediaLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setMediaLoading(false);
      toast({ title: "Error uploading media", status: "error", duration: 5000, isClosable: true, position: "bottom" });
    });
  };

  useEffect(() => {"""

text = text.replace('  useEffect(() => {', post_media_fn, 1)

# 4. Modify form control input
old_input = """            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? <div>Typing...</div> : <></>}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>"""

new_input = """            <FormControl onKeyDown={sendMessage} mt={3}>
              {isTyping ? <div>Typing...</div> : <></>}
              {mediaLoading && <Spinner alignSelf="center" />}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />
                <IconButton
                  aria-label="Upload media"
                  icon={<AttachmentIcon />}
                  ml={2}
                  onClick={() => document.getElementById("media-upload").click()}
                  isLoading={mediaLoading}
                />
                <input
                  type="file"
                  id="media-upload"
                  accept="image/*,video/*"
                  style={{ display: "none" }}
                  onChange={(e) => postMedia(e.target.files[0])}
                />
              </div>
            </FormControl>"""

text = text.replace(old_input, new_input)

with open('src/components/miscellaneous/SingleChat.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("SingleChat.jsx patched")
