const { redisClient } = require("../config/redis");

const otpCooldown = async (key, expiry) => {

    const exists = await redisClient.get(key);

    if (exists) {
        return false;
    }

    await redisClient.set(
        key,
        1,
        {
            EX: expiry
        }
    );

    return true;
};


module.exports = otpCooldown;