#!/bin/bash

# UI Components
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/Alert|@/components/ui/Alert|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/Badge|@/components/ui/Badge|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/Button|@/components/ui/Button|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/ClickToCopy|@/components/ui/ClickToCopy|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/Dropdown|@/components/ui/Dropdown|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/Pagination|@/components/ui/Pagination|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/ProfilePicture|@/components/ui/ProfilePicture|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/Select|@/components/ui/Select|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/Table|@/components/ui/Table|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/Tabs|@/components/ui/Tabs|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/Tooltip|@/components/ui/Tooltip|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/DateRangeInput|@/components/ui/DateRangeInput|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/MultipleSelectDropdown|@/components/ui/MultipleSelectDropdown|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/SearchInput|@/components/ui/SearchInput|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/TextEditor|@/components/ui/TextEditor|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/SectionCard|@/components/ui/SectionCard|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/SettingsCard|@/components/ui/SettingsCard|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/StatsCard|@/components/ui/StatsCard|g'

# Charts
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/ActivityLineChart|@/components/charts/ActivityLineChart|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/AgeBarChart|@/components/charts/AgeBarChart|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/GenderPieChart|@/components/charts/GenderPieChart|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/IntroductionChart|@/components/charts/IntroductionChart|g'

# Features
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/CampaignLabels|@/components/features/CampaignLabels|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/CountriesTable|@/components/features/CountriesTable|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/InputTagLabels|@/components/features/InputTagLabels|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/KYCStatsGrid|@/components/features/KYCStatsGrid|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/MembersTable|@/components/features/MembersTable|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/PublisherActionsDropdown|@/components/features/PublisherActionsDropdown|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/RightSidePanel|@/components/features/RightSidePanel|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/Timeline|@/components/features/Timeline|g'
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -print0 | xargs -0 sed -i '' 's|@/components/PercentageInput|@/components/features/PercentageInput|g'
