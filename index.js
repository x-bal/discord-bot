const Discord = require('discord.js');
const { google } = require('googleapis');
const config = require('./config.json');

const client = new Discord.Client();
const sheets = google.sheets('v4');
const auth = new google.auth.JWT(
  config.googleAuth.client_email,
  null,
  config.googleAuth.private_key.replace(/\\n/gm, "\n"),
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', async (message) => {
  const channelId = "1119614007020625920";
  const commands = ["!absen", "!ijin", "!sakit", "!lembur"];

  let status = '';

  if(message.content === '!absen'){
    status = "Hadir";
  }

  if(message.content === '!ijin'){
    status = "Ijin";
  }

  if(message.content === '!sakit'){
    status = "Sakit";
  }

  if(message.content === '!lembur'){
    status = "Lembur";
  }


  if(message.channel.id == channelId){
    if(commands.includes(message.content)){
      const username = message.author.username;
      const currentTime = new Date().toLocaleString();
  
      const values = [[currentTime, username, status]];
  
      sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: config.googleAuth.spreadsheetId,
        range: 'Absensi!A1',
        valueInputOption: 'USER_ENTERED',
        resource: { values },
      }, (err, response) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Data berhasil ditambahkan ke Google Sheets:', response.data);
        client.channels.cache.get(channelId).send("Absen berhasil")
      });
    }else if(message.content === "Absen berhasil" || message.content === "Wrong Command" || message.content === "Wrong Channel"){
    }
    else{
      client.channels.cache.get(channelId).send("Wrong Command")
    }
  }else{
    // client.channels.cache.get(channelId).send("Wrong Channel")
  } 
});

client.login("MTExOTgxMTQwOTc5NTA5MjY1Mw.Gvytho.51P9mkkm6a5FJwCSd-Xfl2LEb7anS9GfldXdZA");
