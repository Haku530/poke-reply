"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.name = exports.Config = void 0;
const koishi_1 = require("koishi");
// 定义一个Schema对象，描述配置项的结构
exports.Config = koishi_1.Schema.object({
    replies: koishi_1.Schema.array(String).description('自定义回复文本数组').default(['不要戳我！', '你想干什么？', '再戳我就生气了！', '你有什么事吗？', '你好无聊啊。', '你是不是喜欢我？']),
    pokeBack: koishi_1.Schema.boolean().description('是否启用戳回去功能').default(true),
    pokeProb: koishi_1.Schema.number().description('戳回去概率').default(0.2)
});
exports.name = 'poke-reply';
function apply(ctx, config) {
    ctx.on('notice/poke', async (session) => {
        // 如果目标是机器人
        if (session.targetId === session.selfId) {
            // 获取用户自定义的回复文本数组，如果没有则使用配置项中的默认值
            const replies = config.replies ?? [
                '不要戳我！',
                '你想干什么？',
                '再戳我就生气了！',
                '你有什么事吗？',
                '你好无聊啊。',
                '你是不是喜欢我？'
            ];
            // 从数组中随机选择一个消息
            const reply = replies[Math.floor(Math.random() * replies.length)];
            const prob = config.pokeProb ?? 0.2;
            // 判断是否启用了戳回去功能，并且随机数小于prob
            if (config.pokeBack !== false && Math.random() < prob) {
                // 使用send方法发送poke给用户
                await session.send(`<onebot:poke qq="${session.userId}"/>`);
            }
            else {
                // 否则发送回复消息
                await session.send(reply);
            }
        }
    });
}
exports.apply = apply;
