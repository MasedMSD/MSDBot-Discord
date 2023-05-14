import { DEVELOPERS, PREFIX } from "../../../../config/config";
import { embedResult } from "../../../modules";
import { Handler } from "../../../structures";
import { BaseGuildTextChannel } from "discord.js";

export default new Handler({
	name: "MessageInteraction",

	run: async ({ client }) => {
		client.on("messageCreate", async (message) => {
			const { author, content, member, guild, channel } = message;
			const { text_commands: commands } = client;

			if (author.bot || !content.startsWith(PREFIX)) return;

			const args = content.slice(PREFIX.length).trim().split(/ +/);
			const cmd = args.shift()!.toLowerCase();
			const command = commands.get(cmd) || commands.find(({ aliases }) => aliases && aliases.includes(cmd));

			if (!command) return;

			const { devOnly, guildIDs, nsfwOnly, permissions, runInDM, userIDs, run } = command;

			if (message.inGuild()) {
				if (permissions && permissions.length > 0 && member?.permissions.has(permissions)) {
					const embed = embedResult("Permissions Error", "You don't have enough permissions!", "Fail");
					await message.reply({ embeds: [embed] });

					return;
				}

				if (guildIDs && guildIDs.length > 0 && guild && !guildIDs.includes(guild.id)) {
					return;
				}

				if (nsfwOnly && channel instanceof BaseGuildTextChannel && !channel.nsfw) {
					const embed = embedResult("Channel Error", "🔞┆This chat should be NSFW!", "Fail");
					await message.reply({ embeds: [embed] });

					return;
				}
			}

			if (userIDs && userIDs.length > 0 && !userIDs.includes(author.id)) {
				const embed = embedResult("User Error", "You can't use this!", "Fail");
				await message.reply({ embeds: [embed] });

				return;
			}

			if (!runInDM && !message.inGuild()) {
				const embed = embedResult("Channel Error", "You can't use this in DM!", "Fail");
				await message.reply({ embeds: [embed] });

				return;
			}

			if (devOnly && !DEVELOPERS.includes(author.id)) {
				const embed = embedResult("User Error", "You can't use this!", "Fail");
				await message.reply({ embeds: [embed] });

				return;
			}

			await run({ client, message, args, structure: command }).catch(async (err) => {
				console.error(`${command.name}: \n${err}`);

				return await message.reply("An unexpected error occurred!");
			});
		});
	},
});
