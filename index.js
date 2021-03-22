function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  number = random(1, 6)
  if(number == 1) {
    //red
    return "#FF0000"
  }
  if(number == 2) {
    //orange
    return "#FF9900"
  }
  if(number == 3) {
    //yellow
    return "#FFFF00"
  }
  if(number == 4) {
    //green
    return "#00FF00"
  }
  if(number == 5) {
    //blue
    return "#0000FF"
  }
  if(number == 6) {
    //purple
    return "#9900FF"
  }
}

function embedZeroFields(color, title) {
  let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(title)
  return embed
}

function embedOneField(color, title, name, value) {
  let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .addField(name, value)
  return embed
}

function embedTwoFields(color, title, field1Name, feild1Value, field2Name, field2Value) {
  let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .addFields(
      { name: field1Name, value: feild1Value},
      { name: field2Name, value: field2Value}
    )
  return embed
}

function embedThreeFields(color, title, field1Name, feild1Value, field2Name, field2Value, field3Name, field3Value) {
  let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .addFields(
      { name: field1Name, value: feild1Value},
      { name: field2Name, value: field2Value},
      { name: field3Name, value: field3Value}
    )
  return embed
}

function checkAdmin(message) {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    console.log("admin")
    return 1
  } else {
    message.channel.send(embedZeroFields(randomColor(), ":x:You Need To Have Admin:x:"))
  }
}

let picked = 0
let numbers = {}
let leaderboard = {}
let embed

const Discord = require('discord.js');
const { Client } = require("discord.js");
const keepAlive = require('./server.js');
 
const client = new Client({
  disableEveryone: true
});
 
keepAlive();

client.on('message', message => {
  if(message.content === "reset") {
    if(checkAdmin(message)) {
      numbers[message.guild.id + "prefix"] = "^"
      message.channel.send(embedZeroFields(randomColor(), "Prefix reset to ^"))
    }
  }
  if(message.content === "admin") {
    if (checkAdmin(message)) {
      message.reply(" has admin")
    } else {
      message.reply(" does not have admin")
    }
  }
  if(isNaN(numbers[message.guild.id +"min"])) {
    numbers[message.guild.id +"min"] = 1
  }
  if(isNaN(numbers[message.guild.id +"max"])) {
    numbers[message.guild.id +"max"] = 10
  }
  if(isNaN(numbers[message.guild.id +"total"])) {
    numbers[message.guild.id +"total"] = 4
  }
  if(numbers[message.guild.id +"prefix"] == undefined) {
    numbers[message.guild.id +"prefix"] = "^"
  }
  
  if (message.author.bot || message.content.charAt(0) != numbers[message.guild.id + "prefix"]) {
    return
  }

  if(message.content.charAt(0) == numbers[message.guild.id + "prefix"]) {
    message.content = message.content.substring(1)
  }
  message.content = message.content.split(" ")
  
  //help
  if (message.content[0] === 'help') {
    embed = new Discord.MessageEmbed()
      .setColor(randomColor())
      .setTitle("HELP")
      .setURL("https://docs.google.com/document/d/1dWMOoGXSzHVW7o-H8HEa7Lss3WfZ5PDTdRTqbQWjxio/edit")
    
    message.channel.send(embed)
  }

  if(message.content[0] === "vote") {
    embed = new Discord.MessageEmbed()
      .setColor(randomColor())
      .setTitle("VOTE")
      .setURL("https://top.gg/bot/804703001431507004/vote")
    
    message.channel.send(embed)
  }
  if (isNaN(numbers[message.author.id + "endless"])) {
    numbers[message.author.id + "endless"] = 0
  }
  //start
  if (message.content[0] === 'start') {
    if (isNaN(numbers[message.author.id + "min"])) {
     numbers[message.author.id + "min"] = numbers[message.guild.id + "min"]
    }
    if (isNaN(numbers[message.author.id + "max"])) {
     numbers[message.author.id + "max"] = numbers[message.guild.id + "max"]
    }
    if (isNaN(numbers[message.author.id + "total"])) {
     numbers[message.author.id + "total"] = numbers[message.guild.id + "total"]
    }
    
    
    picked = random(numbers[message.author.id + "min"], numbers[message.author.id + "max"])

	 message.channel.send(embedTwoFields(randomColor(), "Picked", "parameters", numbers[message.author.id + "min"] + "-" + numbers[message.author.id + "max"], "guesses", numbers[message.author.id + "total"]));

   numbers[message.author.id] = picked
   numbers[message.author.id + "guesses"] = numbers[message.author.id + "total"]
   if(numbers[message.author.id + "endless"] == 1) {
     numbers[message.author.id + "guesses"] = -5
   }
   [message.author.id + "total"]
  }

  //higher/lower
  if (message.content[0] < numbers[message.author.id] && numbers[message.author.id + "guesses"] > 0 || message.content[0] < numbers[message.author.id] && numbers[message.author.id + "endless"] == 1) {
   message.channel.send(embedZeroFields(randomColor(), ':arrow_up:higher:arrow_up:'));
   numbers[message.author.id + "guesses"] -= 1
   if (numbers[message.author.id + "guesses"] == 0) {
      message.reply('game over')
      message.channel.send('the number was ' + numbers[message.author.id])
      numbers[message.author.id + "guesses"] -= 1
    }
  }
  if (message.content[0] > numbers[message.author.id] && numbers[message.author.id + "guesses"] > 0 || message.content[0] > numbers[message.author.id] && numbers[message.author.id + "endless"] == 1) {
    message.channel.send(embedZeroFields(randomColor(), ':arrow_down:lower:arrow_down:'))
    numbers[message.author.id + "guesses"] -= 1
    if (numbers[message.author.id + "guesses"] == 0) {
      message.reply('game over')
      numbers[message.author.id + "guesses"] -= 1
    }
  }
  if (message.content[0] == numbers[message.author.id] && numbers[message.author.id + "guesses"] > 0 || message.content[0] == numbers[message.author.id] && numbers[message.author.id + "endless"] == 1) {
    if(isNaN(leaderboard[message.author.id])) {
      leaderboard[message.author.id] = 0
    }

    numbers[message.author.id + "guesses"] = 0

    score = (numbers[message.author.id + "max"] - numbers[message.author.id + "min"] + 1) - Math.pow(2, numbers[message.author.id + "total"])

    if(score < 1){
      score = 1    
    }
    if(numbers[message.author.id + "endless"] == 0){
      leaderboard[message.author.id] += score
    message.channel.send(embedOneField(randomColor(), ':white_check_mark:Congradulations you won:white_check_mark:', 'score', score)) 
    } else {
      message.channel.send(embedOneField(randomColor(), "You Got It", "Score", "Nothing Since You Were In Endless Mode"))
    }
    
  }

  //endless
  if(message.content[0] === "endless") {
    if(isNaN(numbers[message.author.id + "endless"])) {
      numbers[message.author.id + "endless"] = 0
    }
    if(numbers[message.author.id + "endless"] == 0) {
      numbers[message.author.id + "endless"] = 1
      message.channel.send(embedOneField(randomColor(), "endless mode", "new setting", "endless mode on"))
    } else if(numbers[message.author.id + "endless"] == 1) {
      numbers[message.author.id + "endless"] = 0
      message.channel.send(embedOneField(randomColor(), "endless mode", "new setting", "endless mode off"))
    }
  }

  //prefix
  if(message.content[0] === "prefix") {
    if(checkAdmin(message)) { 
      oldPrefix = numbers[message.guild.id + "prefix"]
      if(message.content[1] == undefined) {
      message.reply('you need an actual prefix')
        return
      }
      if(message.content[1].length > 1) {
        message.reply("prefixes can only be one character")
        return
      }
      numbers[message.guild.id + "prefix"] = message.content[1]
      message.channel.send(embedTwoFields(randomColor(), "Prefix Changed", "Old Prefix", oldPrefix, "New Prefix", numbers[message.guild.id + "prefix"]))
    }
  }

  //minmax

  if(message.content[0] === "minmax") {
    message.content[1] = parseInt(message.content[1])
    message.content[2] = parseInt(message.content[2])
    if (isNaN(message.content[1]) || isNaN(message.content[2])) {
      message.reply(':x:numbers not strings:x:')
      return
    }
    numbers[message.author.id + "min"] = message.content[1]
    numbers[message.author.id + "max"] = message.content[2]
    message.channel.send(embedTwoFields(randomColor(), "MinMax changed", "New Minimum", numbers[message.author.id + "min"], "New Maximum", numbers[message.author.id + "max"]))
  }

  //guesses amount
  if (message.content[0] === "guesses") {
    message.content[1] = parseInt(message.content[1])
    if (isNaN(message.content[1])) {
      message.reply(':x:numbers not strings:x:')
      return
    }
    numbers[message.author.id + "total"] = message.content[1]
    message.channel.send(embedOneField(randomColor(), "Guesses Changed", "New Guesses", numbers[message.author.id + "total"]))
  }

  //guesses left
  if(message.content[0] === "guessesleft") {
    if(numbers[message.author.id + "endless"] == 0){
      message.channel.send(embedOneField(randomColor(), "Guesses Left", "Amount", numbers[message.author.id + "guesses"]))
    } else {
      message.channel.send(embedOneField(randomColor(), "Guesses Left", "Amount", "endless"))
    }
  } 

  //score
  if(message.content[0] === "score") {
   if(isNaN(leaderboard[message.author.id])){
     leaderboard[message.author.id] = 0
   }
    message.channel.send(embedOneField(randomColor(), "Score", message.author.username, leaderboard[message.author.id]))
  }

  //settings
  if(message.content[0] === "setting" || message.content[0] === "settings") {
    if (isNaN(numbers[message.author.id + "min"])) {
     numbers[message.author.id + "min"] = numbers[message.guild.id + "min"]
    }
    if (isNaN(numbers[message.author.id + "max"])) {
     numbers[message.author.id + "max"] = numbers[message.guild.id + "max"]
    }
    if (isNaN(numbers[message.author.id + "total"])) {
     numbers[message.author.id + "total"] = numbers[message.guild.id + "total"]
    }
    if(numbers[message.author.id + "endless"] == 0){
      message.channel.send(embedThreeFields(randomColor(), "Settings", "Minimum", numbers[message.author.id + "min"], "Maximum", numbers[message.author.id + "max"], "Guesses", numbers[message.author.id + "total"]))
    } else {
      message.channel.send(embedThreeFields(randomColor(), "Settings", "Minimum", numbers[message.author.id + "min"], "Maximum", numbers[message.author.id + "max"], "Guesses", "Endless"))
    }
  }

  if (message.content[0] === "default") {
    message.content[1] = parseInt(message.content[1])
    message.content[2] = parseInt(message.content[2])
    message.content[3] = parseInt(message.content[3])

    if (isNaN(message.content[1]) || isNaN(message.content[2]) || isNaN(message.content[3])) {
      message.channel.send(embedThreeFields(randomColor(),"Default Settings", "Minimum", numbers[message.guild.id + "min"], "Maximum", numbers[message.guild.id + "max"], "Guesses", numbers[message.guild.id + "total"]))
      return
    }
    if(checkAdmin(message)){
      numbers[message.guild.id + "min"] = message.content[1] 
      numbers[message.guild.id + "max"] = message.content[2]
      numbers[message.guild.id + "total"] = message.content[3]
      message.channel.send(embedThreeFields(randomColor(),":white_check_mark:default settings have been changed:white_check_mark:", "Minimum", numbers[message.guild.id + "min"], "Maximum", numbers[message.guild.id + "max"], "Guesses", numbers[message.guild.id + "total"]))
    }
  }

  if(message.content[0] === "ping") {
    message.channel.send(embedZeroFields('#FF0000', 'pong:ping_pong:'))
  }

  if(message.content[0] === "playing") {
    client.user.setActivity("^help"); 
  }
});

client.login(process.env.TOKEN);
