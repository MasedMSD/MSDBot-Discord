import { BaseGuildTextChannel, GuildMember } from "discord.js";
import { DEVELOPERS } from "../../../../config/config";
import { embedResult } from "../../../modules";
import { Handler } from "../../../structures";

export default new Handler({
	name: "SelectMenuInteraction",

	run: async ({ client }) => {
		client.on("interactionCreate", async (interaction) => {
			if (!interaction.isAnySelectMenu()) return;

			const { user, customId, member, channel } = interaction;
			const { select_menus } = client;

			const select_menu = select_menus.get(customId);

			if (!select_menu) return;

			const { devOnly, nsfwOnly, permissions, runInDM, userIDs, run } = select_menu;

			if (interaction.inGuild()) {
				if (permissions && permissions.length > 0 && (member as GuildMember).permissions.has(permissions)) {
					const embed = embedResult("Permissions Error", "You don't have enough permissions!", "Fail");
					await interaction.reply({ embeds: [embed], ephemeral: true });

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

			await run({ client, interaction, structure: select_menu }).catch(async (err) => {
				console.error(`${select_menu.name}: \n${err}`);

				return await interaction.reply({ content: "An unexpected error occurred!", ephemeral: true });
			});
		});
	},
});
