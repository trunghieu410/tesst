import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vietnamese names
const firstNames = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi',
  'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Mai', 'Trịnh', 'Đinh', 'Tăng', 'Cao'
];

const middleNames = ['Văn', 'Thị', 'Công', 'Minh', 'Anh', 'Đức', 'Hữu', 'Quốc', 'Thanh', 'Tuấn'];

const lastNames = [
  'An', 'Bình', 'Cường', 'Dũng', 'Hùng', 'Khoa', 'Long', 'Nam', 'Phong', 'Quân',
  'Sơn', 'Tâm', 'Thắng', 'Việt', 'Hà', 'Hương', 'Lan', 'Linh', 'Mai', 'Nga',
  'Oanh', 'Phương', 'Thảo', 'Thu', 'Trang', 'Tuyết', 'Vân', 'Yến', 'Hoa', 'Kiều'
];

const countries = [
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳' }
];

const kycStatuses = ['not_started', 'pending', 'approved', 'rejected'];
const accountStatuses = ['active', 'suspended', 'deleted'];

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateName() {
  const firstName = randomElement(firstNames);
  const middleName = randomElement(middleNames);
  const lastName = randomElement(lastNames);
  return `${firstName} ${middleName} ${lastName}`;
}

function generateEmail(name, id) {
  const nameSlug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '.');
  return `${nameSlug}${id}@gmail.com`;
}

function generateDate(startYear = 2023, endYear = 2025) {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(randomInt(0, 23)).padStart(2, '0');
  const minutes = String(randomInt(0, 59)).padStart(2, '0');
  
  return `${month}.${day}.${year} - ${hours}:${minutes}`;
}

function generatePublishers(count) {
  const publishers = [];
  
  for (let i = 1; i <= count; i++) {
    const name = generateName();
    const email = generateEmail(name, i);
    const country = randomElement(countries);
    const members = randomInt(0, 1000);
    const createdAt = generateDate();
    const kyc = randomElement(kycStatuses);
    const status = randomElement(accountStatuses);
    
    publishers.push({
      id: i,
      name,
      email,
      country,
      members,
      createdAt,
      kyc,
      status
    });
  }
  
  return publishers;
}

// Read existing db.json
const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// Generate 2100 publishers
console.log('Generating 2100 publishers...');
const publishers = generatePublishers(2100);

// Update db with new publishers
db.publishers = publishers;

// Write back to db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');

console.log(`✅ Successfully generated ${publishers.length} publishers!`);
console.log(`📊 Statistics:`);
console.log(`   - Total publishers: ${publishers.length}`);
console.log(`   - Countries: ${countries.length}`);
console.log(`   - KYC statuses: ${kycStatuses.join(', ')}`);
console.log(`   - Account statuses: ${accountStatuses.join(', ')}`);

