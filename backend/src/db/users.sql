-- 如果 users 已存在，删除 users 表
DROP TABLE IF EXISTS users;
-- 创建 users 表
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    phone TEXT UNIQUE,
    email TEXT NOT NULL UNIQUE,
    psd TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- 插入一百条用户数据
WITH RECURSIVE cnt(x) AS (
    SELECT 1
    UNION ALL
    SELECT x + 1
    FROM cnt
    WHERE x < 100
)
INSERT INTO users (phone, email, psd, createdAt)
SELECT '123456789' || x,
    'user' || x || '@example.com',
    '123456',
    CURRENT_TIMESTAMP
FROM cnt;