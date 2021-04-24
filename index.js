function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor(message) {
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
    message.channel.send(embedZeroFields(randomColor(message), ":x:You Need To Have Admin:x:"))
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
      message.channel.send(embedZeroFields (randomColor(message), "Prefix reset to ^"))
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

    if(message.content[0] === 'pat') {
      if(message.mentions.users.size == 1) {
        message.channel.send(message.author.username + " pats " + message.mentions.users.first().username)
        rando = random(1,4)
        if(rando == 1) {
          message.channel.send('https://images-ext-2.discordapp.net/external/53hb0t1Ftok6KiDCAlHhjleRyUijebg34PfmWLsY244/https/cdn.weeb.sh/images/HyWlxJFvb.gif')
        }
        if(rando == 2) {
          message.channel.send('https://images-ext-1.discordapp.net/external/8tlbO-PtNvDizaijNJSJrzY1-lGprkAw_aO95H196dQ/https/cdn.weeb.sh/images/r1Y5L6NCZ.gif?width=475&height=264')
        }
        if(rando == 3) {
          message.channel.send('https://media.tenor.com/videos/2c9d6cda69a0451c4e141e3b9877f595/mp4')
        }
        if(rando == 4) {
          message.channel.send('https://media.tenor.com/videos/d3b9497fde0eb588767dbc23082fd7ea/mp4')
        }
      }
    }

    //throw 
    if(message.content[0] === 'throw') {
      if(message.mentions.users.size == 1) {
        message.channel.send(message.author.username + " throws " + message.mentions.users.first().username)
        rando = random(1,4)
        if(rando == 1) {
          message.channel.send('https://media.tenor.co/videos/78b563ff60c67e31e3160f1b5ba8638d/mp4')
        }
        if(rando == 2) {
          message.channel.send('https://media.tenor.co/videos/d40bd176e0e7686bc2e871b25021dc6b/mp4')
        }
        if(rando == 3) {
          message.channel.send('https://media.tenor.co/videos/696f17fb7a3e470434baed68e0c038f1/mp4')
        }
        if(rando == 4) {
          message.channel.send('https://media.discordapp.net/attachments/805873492649312336/835174589986242610/unknown.gif')
        }
      }
    }



    //help
    if (message.content[0] === 'help') {
      embed = new Discord.MessageEmbed()
        .setColor(randomColor(message))
        .setTitle("HELP")
        .setURL("https://docs.google.com/document/d/1dWMOoGXSzHVW7o-H8HEa7Lss3WfZ5PDTdRTqbQWjxio/edit")
      
      message.channel.send(embed)
    }

    //links
    if(message.content[0] === "link" || message.content[0] === "links") {
     message.channel.send(numbers[message.guild.id + "prefix"] + "vote")
     message.channel.send(numbers[message.guild.id + "prefix"] + "server")
     message.channel.send(numbers[message.guild.id + "prefix"] + "invite")
    }
    //vote
    if(message.content[0] === "vote") {
      embed = new Discord.MessageEmbed()
        .setColor(randomColor(message))
        .setTitle("VOTE")
        .setURL("https://top.gg/bot/804703001431507004/vote")
      message.channel.send(embed)
      if(message.guild.id == 804867897243336784) {
        console.log("ok")
        embed = new Discord.MessageEmbed()
         .setColor(randomColor(message))
         .setTitle("SERVER VOTE")
         .setURL("https://top.gg/servers/804867897243336784/vote")
        message.channel.send(embed)
      }
    }
    //server
    if(message.content[0] === "server") {
      embed = new Discord.MessageEmbed()
        .setColor(randomColor(message))
        .setTitle("SERVER")
        .setURL("https://discord.gg/RkwqWD8N3D")
      message.channel.send(embed)
    }
    //invite
    if(message.content[0] === "invite") {
      embed = new Discord.MessageEmbed()
        .setColor(randomColor(message))
        .setTitle("INVITE")
        .setURL("https://discord.com/oauth2/authorize?client_id=804703001431507004&scope=bot&permissions=67632192")
      message.channel.send(embed)
    }

    if(message.content[0] === "servers") {
      message.channel.send(embedZeroFields(randomColor(message), "Higher Lower Is In " + client.guilds.cache.size + " Servers"))
    }

    if (isNaN(numbers[message.author.id + "endless"])) {
      numbers[message.author.id + "endless"] = 0
    }
    
    //mode
    if(message.content[0] === 'mode') {
      if(message.content[1] === 'number' || message.content[1] === 'numbers') {
        numbers[message.author.id + "mode"] = number
      }
      if(message.content[1] === 'word' || message.content[1] === 'word') {
        numbers[message.author.id + "mode"] = word
      }
      if(message.content[2] === 'endless') {
        numbers[message.author.id + "endless"] = 1
      } else {
        numbers[message.author.id + "endless"] = 0
      }
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
      if(isNaN(numbers[message.author.id + 'deduction'])){
        numbers[message.author.id + "deduction"] = 0
      }
      numbers[message.author.id + "currentMin"] = numbers[message.author.id + "min"]
      numbers[message.author.id + "currentMax"] = numbers[message.author.id + "max"]
      if(numbers[message.author.id + "min"] == Infinity || numbers[message.author.id + "max"] == Infinity || numbers[message.author.id + "min"] == -Infinity || numbers[message.author.id + "max"] == -Infinity) {
        numbers[message.author.id + "min"] = 1
        numbers[message.author.id + "max"] = 10
      }
      numbers[message.author.id + "deduction"] = 0

      picked = random(numbers[message.author.id + "min"], numbers[message.author.id + "max"])

    message.channel.send(embedTwoFields(randomColor(message), "Picked", "parameters", numbers[message.author.id + "min"] + "-" + numbers[message.author.id + "max"], "guesses", numbers[message.author.id + "total"]));

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
    if(message.content[0] > numbers[message.author.id + "currentMin"]) {
      numbers[message.author.id + "currentMin"] = message.content[0]
    }
    message.channel.send(embedZeroFields(randomColor(message), ':arrow_up:higher:arrow_up:'));
    numbers[message.author.id + "guesses"] -= 1
    if (numbers[message.author.id + "guesses"] == 0) {
        message.reply('game over')
        message.channel.send('the number was ' + numbers[message.author.id])
        numbers[message.author.id + "guesses"] -= 1
      }
    }
    if (message.content[0] > numbers[message.author.id] && numbers[message.author.id + "guesses"] > 0 || message.content[0] > numbers[message.author.id] && numbers[message.author.id + "endless"] == 1) {
      if(message.content[0] < numbers[message.author.id + "currentMax"]) {
      numbers[message.author.id + "currentMax"] = message.content[0]
    }
      message.channel.send(embedZeroFields(randomColor(message), ':arrow_down:lower:arrow_down:'))
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

      while(numbers[message.author.id + "deduction"] > 0) {
        score = score / 2
        numbers[message.author.id + "deduction"] -= 1
      }
      score = Math.floor(score)

      if(score < 1){
        score = 1    
      }
      if(numbers[message.author.id + "originalEndless"] == 0){
        leaderboard[message.guild.id + message.author.id] += score
      message.channel.send(embedOneField(randomColor(message), ':white_check_mark:Congradulations you won:white_check_mark:', 'score', score)) 
      } else {
        message.channel.send(embedOneField(randomColor(message), "You Got It", "Score", "Nothing Since You Were In Endless Mode"))
      }
    }
    //hint
    if(message.content[0] === "hint") {
      message.channel.send(embedOneField(randomColor(message), "Hint", "current minmax", numbers[message.author.id + "currentMin"] + "-" + numbers[message.author.id + "currentMax"]))
    }

    //best
    if(message.content[0] === 'best') {
      best = numbers[message.author.id + "currentMin"]/2+numbers[message.author.id + "currentMax"]/2
      message.channel.send(embedOneField(randomColor(), "Hint", "Best Number", best))
      numbers[message.author.id + "deduction"] += 1
    }

    //endless
    if(message.content[0] === "endless") {
      if(isNaN(numbers[message.author.id + "endless"])) {
        numbers[message.author.id + "endless"] = 0
      }
      if(numbers[message.author.id + "endless"] == 0) {
        numbers[message.author.id + "endless"] = 1
        message.channel.send(embedOneField(randomColor(message), "endless mode", "new setting", "endless mode on"))
      } else if(numbers[message.author.id + "endless"] == 1) {
        numbers[message.author.id + "endless"] = 0
        message.channel.send(embedOneField(randomColor(message), "endless mode", "new setting", "endless mode off"))
      }
    }

    //cheat
    if(message.content[0] === "cheat") {
      if(numbers[message.author.id + "endless"] == 1 && numbers[message.author.id + "originalEndless"] == 1) {
        message.channel.send(embedOneField(randomColor(message), "Cheat Mode Enabled", "Number", numbers[message.author.id]))
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
        message.channel.send(embedTwoFields(randomColor(message), "Prefix Changed", "Old Prefix", oldPrefix, "New Prefix", numbers[message.guild.id + "prefix"]))
      }
    }

    //preset
    if(message.content[0] === "preset" || message.content[0] === "presets") {
      message.content[0] = parseInt(message.content[1])
      if(isNaN(message.content[1])) {
        message.channel.send(embedThreeFields(randomColor(), "Presets", "1.Classic", "1-10, 4", "2.Century", "1-100, 7", "3.Meme", "69-420, 9"))
        return
      }
      if(isNaN(numbers[message.author.id + "min"])){
        numbers[message.author.id + "min"] = 1
      }
      if(isNaN(numbers[message.author.id + "max"])){
        numbers[message.author.id + "max"] = 1
      }
      if(isNaN(numbers[message.author.id + "total"])){
        numbers[message.author.id + "total"] = 1
      }
      if(message.content[1] == 1) {
        numbers[message.author.id + "min"] = 1
        numbers[message.author.id + "max"] = 10
        numbers[message.author.id + "total"] = 4
        message.channel.send(embedTwoFields(randomColor(), "Preset Changed", "Range", "1-10", "Guesses", "4"))
      }
      if(message.content[1] == 2) {
        numbers[message.author.id + "min"] = 1
        numbers[message.author.id + "max"] = 100
        numbers[message.author.id + "total"] = 7
        message.channel.send(embedTwoFields(randomColor(), "Preset Changed", "Range", "1-100", "Guesses", "7"))
      }
      if(message.content[1] == 3) {
        numbers[message.author.id + "min"] = 69
        numbers[message.author.id + "max"] = 420
        numbers[message.author.id + "total"] = 9
        message.channel.send(embedTwoFields(randomColor(), "Preset Changed", "Range", "69-420", "Guesses", "9"))
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
      message.channel.send(embedTwoFields(randomColor(message), "MinMax changed", "New Minimum", numbers[message.author.id + "min"], "New Maximum", numbers[message.author.id + "max"]))
    }

    //guesses amount
    if (message.content[0] === "guesses") {
      message.content[1] = parseInt(message.content[1])
      if (isNaN(message.content[1])) {
        message.reply(':x:numbers not strings:x:')
        return
      }
      numbers[message.author.id + "total"] = message.content[1]
      message.channel.send(embedOneField(randomColor(message), "Guesses Changed", "New Guesses", numbers[message.author.id + "total"]))
    }

    //guesses left
    if(message.content[0] === "guessesleft") {
      if(numbers[message.author.id + "endless"] == 0){
        message.channel.send(embedOneField(randomColor(message), "Guesses Left", "Amount", numbers[message.author.id + "guesses"]))
      } else {
        message.channel.send(embedOneField(randomColor(message), "Guesses Left", "Amount", "endless"))
      }
    } 

    //score
    if(message.content[0] === "score") {
    if(isNaN(leaderboard[message.guild.id + message.author.id])){
      leaderboard[message.guild.id + message.author.id] = 0
    }
      if(message.content[1] === "reset") {
        leaderboard[message.guild.id + message.author.id] = 0
        message.channel.send(embedZeroFields(randomColor(message), "Score Reset To 0"))
      
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
            message.channel.send(embedZeroFields(randomColor(message), message.content[2] + " Added To Score"))
            return
          } else {
            if(message.content[2] >= 0) {
              leaderboard[message.guild.id + message.author.id] += message.content[2]
              message.channel.send(embedZeroFields(randomColor(message), message.content[2] + " Added To Score"))
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
          message.channel.send(embedZeroFields(randomColor(message), message.content[2] + " Subtracted From Score"))
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
            message.channel.send(embedZeroFields(randomColor(message), "Score Set To " + message.content[2]))
          } else {
            message.reply("you can't go to the negatives")
          }
        }  
      } else if(message.mentions.users.size == 1){
        if(isNaN(leaderboard[message.guild.id + message.mentions.members.first().id])){
          leaderboard[message.guild.id + message.mentions.members.first().id] = 0
        }
        message.channel.send(embedOneField(randomColor(message), "Score", message.mentions.members.first().user.username + "#" + message.mentions.members.first().user.discriminator, leaderboard[message.guild.id + message.mentions.members.first().id]))
      } else {
        message.channel.send(embedOneField(randomColor(message), "Score", message.author.username + "#" + message.author.discriminator, leaderboard[message.guild.id + message.author.id]))
      }
    }

    //resetscore
    if(message.content[0] === "resetscore") {
      leaderboard[message.guild.id + message.author.id] = 0
      message.channel.send(embedZeroFields(randomColor(message), "Guesses Reset To 0"))
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
        message.channel.send(embedThreeFields(randomColor(message), "Settings", "Minimum", numbers[message.author.id + "min"], "Maximum", numbers[message.author.id + "max"], "Guesses", numbers[message.author.id + "total"]))
      } else {
        message.channel.send(embedThreeFields(randomColor(message), "Settings", "Minimum", numbers[message.author.id + "min"], "Maximum", numbers[message.author.id + "max"], "Guesses", "Endless"))
      }
    }

    if (message.content[0] === "default") {
      message.content[1] = parseInt(message.content[1])
      message.content[2] = parseInt(message.content[2])
      message.content[3] = parseInt(message.content[3])

      if (isNaN(message.content[1]) || isNaN(message.content[2]) || isNaN(message.content[3])) {
        message.channel.send(embedThreeFields(randomColor(message),"Default Settings", "Minimum", numbers[message.guild.id + "min"], "Maximum", numbers[message.guild.id + "max"], "Guesses", numbers[message.guild.id + "total"]))
        return
      }
    if(checkAdmin(message)){
        numbers[message.guild.id + "min"] = message.content[1] 
        numbers[message.guild.id + "max"] = message.content[2]
        numbers[message.guild.id + "total"] = message.content[3]
        message.channel.send(embedThreeFields(randomColor(message),":white_check_mark:default settings have been changed:white_check_mark:", "Minimum", numbers[message.guild.id + "min"], "Maximum", numbers[message.guild.id + "max"], "Guesses", numbers[message.guild.id + "total"]))
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
  //}, 5000)
});

client.login("token");
