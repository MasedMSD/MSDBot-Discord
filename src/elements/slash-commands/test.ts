import { SlashCommand } from "../../structures";

export default new SlashCommand({
	name: "test",
	description: "Testing command",
	nsfwOnly: true,

	run: async ({ interaction }) => {
		return await interaction.reply({ content: "Test!" });
	},
});
