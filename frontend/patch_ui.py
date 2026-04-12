import re

# 1. Patch HomePage.jsx
with open('src/Pages/HomePage.jsx', 'r', encoding='utf-8') as f:
    home_text = f.read()

# Top Box glassmorphism
old_top_box = """      <Box
      bg="white"
        w="100%"
        m="40px 0 15px 0"
      p={4}
      borderRadius="lg"
        borderWidth="1px"
        d='flex'
        justifyContent='center'
        alignItems='center'
      >"""
new_top_box = """      <Box
        bg="rgba(255, 255, 255, 0.15)"
        backdropFilter="blur(20px)"
        borderColor="whiteAlpha.500"
        boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.2)"
        w="100%"
        m="40px 0 15px 0"
        p={4}
        borderRadius="xl"
        borderWidth="1px"
        display='flex'
        justifyContent='center'
        alignItems='center'
      >"""
home_text = home_text.replace(old_top_box, new_top_box)

old_text = '<Text fontSize="4xl" fontFamily="Work sans" color="black" align="center">'
new_text = '<Text fontSize="4xl" fontFamily="\'Outfit\', sans-serif" fontWeight="bold" color="white" align="center" letterSpacing="wide">'
home_text = home_text.replace(old_text, new_text)

old_tabs_box = '<Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">'
new_tabs_box = '<Box bg="rgba(255, 255, 255, 0.2)" backdropFilter="blur(25px)" borderColor="whiteAlpha.600" color="white" boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.2)" w="100%" p={4} borderRadius="2xl" borderWidth="1px">'
home_text = home_text.replace(old_tabs_box, new_tabs_box)

# change soft-rounded variant to color white
home_text = home_text.replace('<Tabs isFitted variant="soft-rounded">', '<Tabs isFitted variant="soft-rounded" colorScheme="cyan">')

with open('src/Pages/HomePage.jsx', 'w', encoding='utf-8') as f:
    f.write(home_text)


# 2. Patch SideDrawer.jsx
with open('src/components/miscellaneous/SideDrawer.jsx', 'r', encoding='utf-8') as f:
    drawer = f.read()

old_drawer_box = """      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >"""
new_drawer_box = """      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="rgba(255, 255, 255, 0.2)"
        backdropFilter="blur(20px)"
        borderBottomWidth="1px"
        borderColor="whiteAlpha.400"
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        w="100%"
        p="10px 15px"
        color="white"
      >"""
drawer = drawer.replace(old_drawer_box, new_drawer_box)

# Replace 'Talk-A-Tive' text inside SideDrawer
old_title_text = '<Text fontSize="2xl" fontFamily="work sans">'
new_title_text = '<Text fontSize="3xl" fontFamily="\'Outfit\', sans-serif" fontWeight="bold" bgGradient="linear(to-r, cyan.300, blue.400)" bgClip="text" letterSpacing="wider">'
drawer = drawer.replace(old_title_text, new_title_text)

# Also fix the button variants
drawer = drawer.replace('<Button variant="ghost" onClick={onOpen}>', '<Button variant="ghost" color="white" _hover={{ bg: "rgba(255,255,255,0.3)" }} onClick={onOpen}>')

with open('src/components/miscellaneous/SideDrawer.jsx', 'w', encoding='utf-8') as f:
    f.write(drawer)


# 3. Patch ScrollableChat.jsx
with open('src/components/miscellaneous/ScrollableChat.jsx', 'r', encoding='utf-8') as f:
    scrollable = f.read()

old_span_style = """                        style={{
                            backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                            marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                        }}"""
new_span_style = """                        style={{
                            background: m.sender._id === user._id ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" : "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
                            color: m.sender._id === user._id ? "white" : "black",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                            marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            borderRadius: "20px",
                            padding: "8px 16px",
                            maxWidth: "75%",
                            fontFamily: "'Inter', sans-serif"
                        }}"""
scrollable = scrollable.replace(old_span_style, new_span_style)

with open('src/components/miscellaneous/ScrollableChat.jsx', 'w', encoding='utf-8') as f:
    f.write(scrollable)


print("UI Overhauled in python!")
