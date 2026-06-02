const fs = require('fs');

let schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

// 1. Remove obsolete models
const modelsToRemove = ['MainBranch', 'SubBranch', 'SubscriptionEarn', 'Payment', 'SubscriptionPlan', 'Subscription', 'WorkType'];
modelsToRemove.forEach(model => {
  const regex = new RegExp(`model\\s+${model}\\s+\\{[\\s\\S]*?\\n\\}`, 'g');
  schema = schema.replace(regex, '');
});

// 2. Remove branchId, subBranchId, subscriptionId and relation fields from all models
// We can use a regex that matches the field definition line
schema = schema.replace(/^\s*branchId\s+String\?.*$/gm, '');
schema = schema.replace(/^\s*branch\s+MainBranch\?.*$/gm, '');
schema = schema.replace(/^\s*subBranchId\s+String\?.*$/gm, '');
schema = schema.replace(/^\s*subBranch\s+SubBranch\?.*$/gm, '');
schema = schema.replace(/^\s*subscriptionId\s+String\?.*$/gm, '');
schema = schema.replace(/^\s*subscription\s+Subscription\?.*$/gm, '');

// Also remove arrays of relations
schema = schema.replace(/^\s*ownedBranches\s+MainBranch\[\].*$/gm, '');
schema = schema.replace(/^\s*managedSubBranches\s+SubBranch\[\].*$/gm, '');
schema = schema.replace(/^\s*subscriptionEarns\s+SubscriptionEarn\[\].*$/gm, '');
schema = schema.replace(/^\s*payments\s+Payment\[\].*$/gm, '');
schema = schema.replace(/^\s*workTypes\s+WorkType\[\].*$/gm, '');

// Remove 'workType' string field from WorkInfo
schema = schema.replace(/^\s*workType\s+String\?.*$/gm, '');

// 3. Remove the datasource url property if it's there (Prisma 7 compat)
schema = schema.replace(/^\s*url\s+=\s+env\("DATABASE_URL"\).*$/gm, '');

fs.writeFileSync('prisma/schema.prisma', schema, 'utf8');
console.log('Schema updated successfully.');
