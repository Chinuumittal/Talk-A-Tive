import re

with open('src/components/miscellaneous/SideDrawer.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# remove all NotificationBadge imports
text = re.sub(r'import NotificationBadge.*?\n', '', text)
text = re.sub(r'import { Effect }.*?\n', '', text)

# add them back once
text = text.replace(
    "import { ChatState } from '../../context/chatprovider';",
    "import { ChatState } from '../../context/chatprovider';\nimport NotificationBadge from \"react-notification-badge\";\nimport { Effect } from \"react-notification-badge\";"
)

# replace Badge with NotificationBadge
badge_pattern = r'\{notification\.length > 0 && \(\s*<Badge[^>]*>\s*\{notification\.length\}\s*</Badge>\s*\)\}'
replacement = '<NotificationBadge count={notification.length} effect={Effect.SCALE} />'
text = re.sub(badge_pattern, replacement, text)

# save back
with open('src/components/miscellaneous/SideDrawer.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("FILE FIXED")
