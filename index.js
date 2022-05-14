import TelegramBot from 'node-telegram-bot-api'
import express from 'express'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config({ path: '.env' })

const app = express()

const bot = new TelegramBot(process.env.TOKEN, {
	polling: true
})

bot.onText(/\/start/, msg => {
	bot.sendMessage(msg.chat.id, `Salom ${msg.chat.first_name}, xush kelibsiz`, {
		reply_markup: JSON.stringify({
			keyboard: [
				[
					{
						text: 'Menyu 📽️'
					},
					{
						text: 'Biz haqimizda 👨‍💻'
					}
				],
				[
					{
						text: 'Siz haqingizda 👦'
					}
				]
			],
			resize_keyboard: true
		})
	})
})

bot.on('message', msg => {
	const { id, first_name } = msg.chat

	if (msg.text === 'Menyu 📽️') {
		bot.sendMessage(id, 'Filmlar', {
			reply_markup: JSON.stringify({
				keyboard: [
					[
						{
							text: 'Titanic'
						},
						{
							text: 'Jack Sparrow'
						}
					],
					[
						{
							text: 'Avatar'
						},
						{
							text: 'Sayfulloni izlab'
						}
					],
					[
						{
							text: 'Ortga qoytingiz'
						}
					]
				],
				resize_keyboard: true
			})
		})
	}

	if (msg.text === 'Ortga qoytingiz') {
		bot.sendMessage(id, `${first_name} ortga qoytdingiz`, {
			reply_markup: JSON.stringify({
				keyboard: [
					[
						{
							text: 'Menyu 📽️'
						},
						{
							text: 'Biz haqimizda 👨‍💻'
						}
					],
					[
						{
							text: 'Siz haqingizda 👦'
						}
					]
				],
				resize_keyboard: true
			})
		})
	}
})

bot.on('message', msg => {
	const { id } = msg.chat

	if (msg.text === 'Titanic') {
		bot.sendPhoto(id, './img/titanic.jpeg', {
			caption: `
				<strong>Titanic by Panji Production</strong>\n\n Eslatma ❗\n <i>Panjining eng mashxur kinolaridan biri</i>\n\n <span class="tg-spoiler">Dunyoning eng mashhur kino-filmi</span>
			`,
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'Kinoni sotib olish',
							callback_data: 'kino'
						},
						{
							text: 'Trailer',
							url: 'https://www.youtube.com/watch?v=CHekzSiZjrY'
						}
					]
				]
			}
		})
	}

	if (msg.text === 'Jack Sparrow') {
		bot.sendPhoto(id, './img/jack-sparrow.jpg', {
			caption: `
					<strong>Pirates of the Caribbean by Panji Production</strong>\n\n Eslatma ❗\n <i>Panjining eng ommabop kinolaridan biri</i>\n\n <span class="tg-spoiler">Jonny Deep hozir sudma-sud yuribdi</span>
				`,
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'Kinoni sotib olish',
							callback_data: 'kino'
						},
						{
							text: 'Trailer',
							url: 'https://www.youtube.com/watch?v=Hgeu5rhoxxY'
						}
					]
				]
			}
		})
	}

	if (msg.text === 'Avatar') {
		bot.sendPhoto(id, './img/avatar.jpg', {
			caption: `
					<strong>Avatar/Xolvatar by Panji Production</strong>\n\n Eslatma ❗\n <i>Ko'k odamlar olamiga xush kelibsiz</i>\n\n <span class="tg-spoiler">Shu ham kinomi, ko'kdan boshqa rang qurib qolganmi</span>
				`,
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'Kinoni sotib olish',
							callback_data: 'kino'
						},
						{
							text: 'Trailer',
							url: 'https://www.youtube.com/watch?v=5PSNL1qE6VY'
						}
					]
				]
			}
		})
	}

	if (msg.text === 'Sayfulloni izlab') {
		bot.sendPhoto(id, './img/sayfullo.jpg', {
			caption: `
					<strong>Sayfulloni Izlab, yohud tentak Tog'a</strong>\n\n Eslatma ❗\n <i>Gaday: Kattaeynay kaldimi</i>\n\n <span class="tg-spoiler">Sayfullo dangir-dungirni kamaytir</span>
				`,
			parse_mode: 'HTML',
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'Kinoni sotib olish',
							callback_data: 'kino'
						},
						{
							text: 'Trailer',
							url: 'https://www.youtube.com/watch?v=SaDAeVqjY0c'
						}
					]
				]
			}
		})
	}
})

bot.on('callback_query', msg => {
	const { id } = msg.message.chat

	if (msg.data === 'kino') {
		bot.sendMessage(id, 'Lokatsiyangizni ulashing', {
			reply_markup: JSON.stringify({
				keyboard: [
					[
						{
							text: 'Lokatsiyangizni beryaring',
							request_location: true
						}
					]
				],
				resize_keyboard: true
			})
		})
	}
})

bot.on('location', async msg => {
	const { latitude, longitude } = msg.location

	const location = await fetch(
		`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=87f526f534114673b84ec3e7d9b3adda`
	)
	const { formatted } = await location.json()

	bot.sendLocation(id, 41.325256, 69.245273)

	console.log(formatted)
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`)
})
