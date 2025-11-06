import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const campaignNames = [
  "Checkin mỗi ngày nhận airdrop OKT",
  "3 lượt xem quảng cáo mỗi ngày nhận ROI",
  "2 lượt xem quảng cáo mỗi ngày nhận ROI",
  "Rút gọn link",
  "Checkin mỗi ngày nhận airdrop BNB",
  "Xem video kiếm tiền",
  "Click quảng cáo nhận thưởng",
  "Đăng ký tài khoản mới",
  "Giới thiệu bạn bè",
  "Hoàn thành nhiệm vụ hàng ngày",
  "Chia sẻ link Facebook",
  "Xem banner quảng cáo",
  "Checkin tuần nhận bonus",
  "Mua gói VIP nhận ưu đãi",
  "Tham gia sự kiện đặc biệt",
];

const imageTypes = [
  "Daily Checkin",
  "View Ads",
  "Shorten Link",
  "Video Ads",
  "Click Ads",
  "Referral",
  "Banner Ads",
  "Social Share",
  "Task Completion",
];

const countries = [
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "CN", name: "Toàn cầu", flag: "🌍" },
];

const commissionTypes = [
  "5 OKT",
  "0.3 ROI",
  "15%",
  "20%",
  "0.000001 BNB",
  "10 USDT",
  "0.5%",
  "1%",
  "3%",
  "5%",
  "25%",
  "30%",
  "0.1 ETH",
  "100 OKT",
];

const notes = [
  "",
  "",
  "",
  "Dạng tạo, đóng dùng",
  "Ghi chú này hơi dài tí để kiểm...",
  "Thiếu hình nha",
  "Cần xem xét lại",
  "Chờ phê duyệt",
  "Đang chờ update",
  "Cần bổ sung thông tin",
];

const statuses = ["active", "pending", "completed", "inactive"];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}.${day}.${year} - ${hours}:${minutes}`;
}

function generateApplicationPeriod() {
  const startDate = new Date(2025, randomInt(0, 11), randomInt(1, 28));
  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + randomInt(1, 6),
    randomInt(1, 28)
  );

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const replies = randomInt(5, 150);
  return `${formatDate(startDate)} - ${formatDate(endDate)}\n${replies} reply`;
}

function generateCampaigns(count) {
  const campaigns = [];
  const startDate = new Date(2024, 0, 1);
  const endDate = new Date();

  for (let i = 1; i <= count; i++) {
    const campaign = {
      id: i,
      name: randomItem(campaignNames),
      imageType: randomItem(imageTypes),
      country: randomItem(countries),
      commission: randomItem(commissionTypes),
      notes: randomItem(notes),
      blacklist: Math.random() > 0.7 ? randomInt(0, 50) : 0,
      whitelist: Math.random() > 0.6 ? randomInt(0, 30) : 0,
      applicationPeriod: generateApplicationPeriod(),
      createdAt: generateRandomDate(startDate, endDate),
      status: randomItem(statuses),
    };

    campaigns.push(campaign);
  }

  return campaigns;
}

function main() {
  console.log("Generating 3000 campaigns...");
  const campaigns = generateCampaigns(3000);

  const dbPath = path.join(__dirname, "db.json");
  let db = { users: [], publishers: [], campaigns: [] };

  // Read existing db.json if it exists
  if (fs.existsSync(dbPath)) {
    try {
      const existingData = fs.readFileSync(dbPath, "utf8");
      db = JSON.parse(existingData);
      console.log("Existing database loaded");
    } catch (error) {
      console.error("Error reading existing db.json:", error);
    }
  }

  // Update campaigns
  db.campaigns = campaigns;

  // Write to db.json
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log(`Successfully generated ${campaigns.length} campaigns`);
  console.log(`Data written to ${dbPath}`);
}

main();

