import { BaseGuildTextChannel, GuildMember } from "discord.js";
import { DEVELOPERS } from "../../../../config/config";
import { embedResult } from "../../../modules";
import { Handler } from "../../../structures";

export default new Handler({
	name: "ButtonInteraction",

	run: async ({ client }) => {
		client.on("interactionCreate", async (interaction) => {
			if (!interaction.isButton()) return;

			const { user, customId, member, guild, channel } = interaction;
			const { buttons } = client;

			const button = buttons.find(({ name }) => {
				customId.startsWith(name as string) ?? (name as string[]).find((option) => customId.startsWith(option));
			});

			if (!button) return;

			const { devOnly, guildIDs, nsfwOnly, permissions, runInDM, userIDs, run } = button;

			if (interaction.inGuild()) {
				if (permissions && permissions.length > 0 && (member as GuildMember).permissions.has(permissions)) {
					const embed = embedResult("Permissions Error", "You don't have enough permissions!", "Fail");
					await interaction.reply({ embeds: [embed], ephemeral: true });

					return;
				}

				if (guildIDs && guildIDs.length > 0 && guild && !guildIDs.includes(guild.id)) {
					return;
				}

				if (nsfwOnly && channel instanceof BaseGuildTextChannel && !channel.nsfw) {
					const embed = embedResult("Channel Error", "🔞┆This chat should be NSFW!", "Fail");
					await interaction.reply({ embeds: [embed], ephemeral: true });

					return;
				}
			}

			if (userIDs && userIDs.length > 0 && !userIDs.includes(user.id)) {
				const embed = embedResult("User Error", "You can't use this!", "Fail");
				await interaction.reply({ embeds: [embed], ephemeral: true });

				return;
			}

			if (!runInDM && !interaction.inGuild()) {
				const embed = embedResult("Channel Error", "You can't use this in DM!", "Fail");
				await interaction.reply({ embeds: [embed], ephemeral: true });

				return;
			}

			if (devOnly && !DEVELOPERS.includes(user.id)) {
				const embed = embedResult("User Error", "You can't use this!", "Fail");
				await interaction.reply({ embeds: [embed], ephemeral: true });

				return;
			}

			await run({ client, interaction, structure: button }).catch(async (err) => {
				console.error(`${button.name}: \n${err}`);

				return await interaction.reply({ content: "An unexpected error occurred!", ephemeral: true });
			});
		});
	},
});
