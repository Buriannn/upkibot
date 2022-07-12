const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Здравствуйте, для выбора услуги воспользуйтесь командой /services'))
bot.help((ctx) => ctx.reply(text.commands))
bot.command('services', async (ctx) => {
    try {
        await ctx.reply('Услуги', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Кредитный лимит на карту любого банка для физ. лиц', 'btn_1')],
                [Markup.button.callback('Готовые карты с начисленным балансом оформленные на стороннего человека', 'btn_2')],
                [Markup.button.callback('Кредит для юр. лиц и бизнеса', 'btn_3')],
                [Markup.button.callback('Улучшение и очистка кредитной истории', 'btn_4')],
                [Markup.button.callback('Европейский кредит', 'btn_5')],
                [Markup.button.callback('Чат с оператором', 'btn_6')],
            ]
        )) 
    } catch(e) {
        console.error(e)
    }

})

function addActionBot(name, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            await ctx.reply(text)
    
        } catch(e) {
            console.error(e)
        }
    })
}

addActionBot('btn_1', text.text1)
addActionBot('btn_2', text.text2)
addActionBot('btn_3', text.text3)
addActionBot('btn_4', text.text4)
addActionBot('btn_5', text.text5)
addActionBot('btn_6', text.text6)


// bot.chat((ctx) => ctx.reply('@BuriaNNNN'))

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))