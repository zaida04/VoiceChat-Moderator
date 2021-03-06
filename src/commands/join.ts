import { VoiceChannel } from "discord.js";
import { Message } from "discord.js";

const SilentFrame = require("../Internals/Voice/SilentFrame");

export default {
    name: "join",
    category: "voice",
    usage: "[id/mention]",
    description: "Join a mentioned voice channel, or a voice channel that the command executor is in",
    aliases: ["joinvc", "vc", "connect"],
    execute: async (message: Message, [id]: [id: string]) => {
        let { incorrectUsageEmbed, successEmbed } = message.client.utilities;
        if (id) {
            let mentioned_channel = message.guild?.channels.cache.get(id);
            if (mentioned_channel?.type !== "voice")
                return message.channel.send(new incorrectUsageEmbed("That is not a voice channel!"));
            if (mentioned_channel.members.size < 1)
                return message.channel.send(
                    new incorrectUsageEmbed("Sorry, but the channel you mentioned doesn't have anyone in it!")
                );
            ((await mentioned_channel) as VoiceChannel).join();
            return message.channel.send(new successEmbed(`Successfully joined ${mentioned_channel.name}`, message));
        }
        if (message.member?.voice.channel) {
            try {
                let connection = await message.member.voice.channel.join();
                let members = connection.channel.members.filter(
                    (x) => x.user.id !== message.client.user?.id && !x.user.bot
                );
                connection.play(new SilentFrame(), { type: "opus" });
                members.forEach((member) => {
                    if (!message.guild) return;
                    message.client.connections.add(message.guild).add(member);
                });
                return message.channel.send(
                    new successEmbed(`Successfully joined ${message.member.voice.channel.name}`, message)
                );
            } catch (e) {
                console.log(e);
            }
        }
        return message.channel.send(
            new incorrectUsageEmbed(
                "You must either be in a voice channel, or give the id of a voice channel with members in it."
            )
        );
    },
};
