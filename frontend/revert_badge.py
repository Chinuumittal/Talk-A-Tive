import re

with open('src/components/miscellaneous/SideDrawer.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# remove NotificationBadge imports
text = re.sub(r'import NotificationBadge.*?\n', '', text)
text = re.sub(r'import \{ Effect \}.*?\n', '', text)

# replace NotificationBadge usage with Chakra Badge
badge_replacement = """{notification.length > 0 && (
                <Badge
                  colorScheme="red"
                  variant="solid"
                  borderRadius="full"
                  position="absolute"
                  top="-1px"
                  right="-1px"
                >
                  {notification.length}
                </Badge>
              )}"""
text = re.sub(r'<NotificationBadge[^>]*>', badge_replacement, text)

# save back
with open('src/components/miscellaneous/SideDrawer.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("REVERTED TO CHAKRA BADGE")
