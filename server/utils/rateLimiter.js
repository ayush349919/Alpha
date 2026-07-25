const { redisClient } = require("../config/redis");

const otpRateLimiter = async (key, limit, expiry) => {
    const currentCount = await redisClient.get(key);
    if (currentCount && Number(currentCount) >= limit) {
        return false;
    }

    if (!currentCount) {
        await redisClient.set(
            key,
            1,
            {
                EX: expiry
            }
        );
    } else {
        await redisClient.incr(key)
    }
    return true;

}

module.exports = otpRateLimiter;