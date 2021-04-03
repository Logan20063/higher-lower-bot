let channels = []
function hour() {
  for(i = channels.length - 1; i >= 0; i--) {
    channels[i].send("test completed")
  }
}

//send = setInterval(hour, 1000)






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
      message.channel.send(embedZeroField (randomColor(), "Prefix reset to ^"))
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
    
  // if (message.author.bot || message.content.charAt(0) != numbers[message.guild.id + "prefix"]) {
  //   return
  // }

  if (message.content.charAt(0) != numbers[message.guild.id + "prefix"]) {
    return
  }

  if(message.content.charAt(0) == numbers[message.guild.id + "prefix"]) {
     message.content = message.content.substring(1)
  }
  message.content = message.content.split(" ")

    //testing command VV
  if(message.content[0] === "hour") {
    channels.push(message.channel)
  }





    //help
    if (message.content[0] === 'help') {
      embed = new Discord.MessageEmbed()
        .setColor(randomColor())
        .setTitle("HELP")
        .setURL("https://docs.google.com/document/d/1dWMOoGXSzHVW7o-H8HEa7Lss3WfZ5PDTdRTqbQWjxio/edit")
      
      message.channel.send(embed)
    }

    //vote
    if(message.content[0] === "vote") {
      embed = new Discord.MessageEmbed()
        .setColor(randomColor())
        // .addFields(
        //   {name: "VOTE", url: "https://top.gg/bot/804703001431507004/vote"},
        //   {name: "SERVER", url:"https://discord.gg/RkwqWD8N3D"},
        //   {name: "INVITE", url: "https://discord.com/oauth2/authorize?client_id=804703001431507004&scope=bot&permissions=67632192"}
        // )
        .setTitle("VOTE")
        .setURL("https://top.gg/bot/804703001431507004/vote")
        // .setTitle("SERVER")
        // .setURL("https://discord.gg/RkwqWD8N3D")
        // .setTitle("INVITE")
        // .setURL("https://discord.com/oauth2/authorize?client_id=804703001431507004&scope=bot&permissions=67632192")
      message.channel.send(embed)
    }

    if(message.content[0] === "servers") {
      message.channel.send(embedZeroFields(randomColor(), "Higher Lower Is In " + client.guilds.cache.size + " Servers"))
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
      if(numbers[message.author.id + "min"] == Infinity || numbers[message.author.id + "max"] == Infinity || numbers[message.author.id + "min"] == -Infinity || numbers[message.author.id + "max"] == -Infinity) {
        numbers[message.author.id + "min"] = 1
        numbers[message.author.id + "max"] = 10
      }

      picked = random(numbers[message.author.id + "min"], numbers[message.author.id + "max"])

    message.channel.send(embedTwoFields(randomColor(), "Picked", "parameters", numbers[message.author.id + "min"] + "-" + numbers[message.author.id + "max"], "guesses", numbers[message.author.id + "total"]));

    numbers[message.author.id] = picked
    numbers[message.author.id + "guesses"] = numbers[message.author.id + "total"]
    if(numbers[message.author.id + "endless"] == 1) {
      numbers[message.author.id + "guesses"] = -5
    }
    numbers[message.author.id + "originalMin"] = numbers[message.author.id + "min"]
    numbers[message.author.id + "originalMax"] = numbers[message.author.id + "max"]
    numbers[message.author.id + "originalTotal"] = numbers[message.author.id + "total"]
    numbers[message.author.id + "originalEndless"] = numbers[message.author.id + "endless"]
    }

    if(message.content[0] === "duel") {
      if(message.mentions.members.size == 1) {
        message.channel.send("<@" + message.mentions.members.first().user.id + "> has been challanged to a duel, do you accept")
      }
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
        message.channel.send('the number was ' + numbers[message.author.id])
        numbers[message.author.id + "guesses"] -= 1
      }
    }
    if (message.content[0] == numbers[message.author.id] && numbers[message.author.id + "guesses"] > 0 || message.content[0] == numbers[message.author.id] && numbers[message.author.id + "endless"] == 1) {
      if(isNaN(leaderboard[message.guild.id + message.author.id])) {
        leaderboard[message.guild.id + message.author.id] = 0
      }

      numbers[message.author.id + "guesses"] = 0
    
      score = (numbers[message.author.id + "originalMax"] - numbers[message.author.id + "originalMin"] + 2) - Math.pow(2, numbers[message.author.id + "originalTotal"])

      if(score < 1){
        score = 1    
      }
      if(numbers[message.author.id + "originalEndless"] == 0){
        leaderboard[message.guild.id + message.author.id] += score
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

    //cheat
    if(message.content[0] === "cheat") {
      if(numbers[message.author.id + "endless"] == 1 && numbers[message.author.id + "originalEndless"] == 1) {
        message.channel.send(embedOneField(randomColor(), "Cheat Mode Enabled", "Number", numbers[message.author.id]))
      } else {
        message.reply("You must be in endless mode to cheat")
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

    if(message.content[0] === "minmax" || message.content[0] === "range") {
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
    if(isNaN(leaderboard[message.guild.id + message.author.id])){
      leaderboard[message.guild.id + message.author.id] = 0
    }
      if(message.content[1] === "reset") {
        leaderboard[message.guild.id + message.author.id] = 0
        message.channel.send(embedZeroFields(randomColor(), "Score Reset To 0"))
      
      } else if(message.content[1] === "add"){
        message.content[2] = parseInt(message.content[2])
        if (isNaN(message.content[2])) {
          message.reply(':x:numbers not strings:x:')
          return
        }
        if(checkAdmin(message)){  
          if(message.mentions.users.size == 1){
            if(isNaN(leaderboard[message.guild.id + message.mentions.members.first().id])){
              leaderboard[message.guild.id + message.mentions.members.first().id] = 0
            }
            leaderboard[message.guild.id + message.mentions.members.first().id] += message.content[2]
            message.channel.send(embedZeroFields(randomColor(), message.content[2] + " Added To Score"))
            return
          } else {
            if(message.content[2] >= 0) {
              leaderboard[message.guild.id + message.author.id] += message.content[2]
              message.channel.send(embedZeroFields(randomColor(), message.content[2] + " Added To Score"))
            } else {
              message.reply("you need to add something, not subtract")
            }
          }
        }

      } else if(message.content[1] === "subtract" || message.content[1] === "sub"){
        message.content[2] = parseInt(message.content[2])
        if (isNaN(message.content[2])) {
          message.reply(':x:numbers not strings:x:')
          return
        }
        if(leaderboard[message.guild.id + message.author.id] - message.content[2] < 0) {
          message.reply("you can't go to the negatives")
          return
        }
        if(message.content[2] >= 0) {
          leaderboard[message.guild.id + message.author.id] -= message.content[2]
          message.channel.send(embedZeroFields(randomColor(), message.content[2] + " Subtracted From Score"))
        } else {
          message.reply("you need to subtract something, don't cheese it")
        }
      
      }else if(message.content[1] === "set"){
        message.content[2] = parseInt(message.content[2])
        if (isNaN(message.content[2])) {
          message.reply(':x:numbers not strings:x:')
          return
        }
        if(checkAdmin(message)){  
          if(message.content[2] >= 0){  
            leaderboard[message.guild.id + message.author.id] = message.content[2]
            message.channel.send(embedZeroFields(randomColor(), "Score Set To " + message.content[2]))
          } else {
            message.reply("you can't go to the negatives")
          }
        }  
      } else if(message.mentions.users.size == 1){
        if(isNaN(leaderboard[message.guild.id + message.mentions.members.first().id])){
          leaderboard[message.guild.id + message.mentions.members.first().id] = 0
        }
        message.channel.send(embedOneField(randomColor(), "Score", message.mentions.members.first().user.username + "#" + message.mentions.members.first().user.discriminator, leaderboard[message.guild.id + message.mentions.members.first().id]))
      } else {
        message.channel.send(embedOneField(randomColor(), "Score", message.author.username + "#" + message.author.discriminator, leaderboard[message.guild.id + message.author.id]))
      }
    }

    //resetscore
    if(message.content[0] === "resetscore") {
      leaderboard[message.guild.id + message.author.id] = 0
      message.channel.send(embedZeroFields(randomColor(), "Guesses Reset To 0"))
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

  if(message.content[0] === "privacy") {
    message.channel.send("the only personal data higher lower stores is your discord id, username, and discriminator")
  }
});

client.login("TOKEN");
