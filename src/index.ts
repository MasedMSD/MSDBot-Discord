import * as dotenv from "dotenv";
import { GatewayIntentBits, Partials } from "discord.js";
import { Core } from "./structures";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), "config", ".env") });

const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember } = Partials;

const client = new Core({
	intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
	partials: [User, Message, GuildMember],
	allowedMentions: {
		parse: ["roles", "users"],
		repliedUser: false,
	},
	sweepers: {
		messages: { lifetime: 1800, interval: 900 },
	},
});

client.Launch();
