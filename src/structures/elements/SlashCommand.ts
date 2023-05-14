import { ApplicationCommandOptionData, ChatInputCommandInteraction, PermissionResolvable } from "discord.js";
import { Core } from "../Core";

/**
 * Структура функции для запуска слеш команды
 *
 * @interface
 */
interface SlashCommandRunOptions {
	/**
	 * Клиент.
	 *
	 * @type {Core}
	 */
	client: Core;

	/**
	 * Взаимодейсвтие из-за которого выполнилась команда.
	 *
	 * @type {ChatInputCommandInteraction}
	 */
	interaction: ChatInputCommandInteraction;

	/**
	 * Сама команда.
	 *
	 * @type {SlashCommandStructureOptions}
	 */
	structure: SlashCommandStructureOptions;
}

/**
 * Структура слеш команды
 *
 * @interface
 */
interface SlashCommandStructureOptions {
	/**
	 * Имя команды.
	 *
	 * @type {string}
	 */
	name: string;

	/**
	 * Описание команды.
	 *
	 * @type {string}
	 */
	description: string;

	/**
	 * Массив опций команды.
	 *
	 * @type {ApplicationCommandOptionData[]}
	 */
	options?: ApplicationCommandOptionData[];

	/**
	 * Массив строк с айди пользователей которые могут использовать данную команду.
	 *
	 * @type {string[]}
	 */
	userIDs?: string[];

	/**
	 * Массив с разрешениями для использования этой команды.
	 *
	 * @type {PermissionResolvable[]}
	 */
	permissions?: PermissionResolvable[];

	/**
	 * Должна ли данная команда запускаться в личных сообщениях.
	 *
	 * @type {boolean}
	 */
	runInDM?: boolean;

	/**
	 * Должна ли данная команда запускаться в канале с пометкой NSFW.
	 *
	 * @type {boolean}
	 */
	nsfwOnly?: boolean;

	/**
	 * Должен ли эту команду использовать только разработчик.
	 *
	 * @type {boolean}
	 */
	devOnly?: boolean;

	/**
	 * Функция для запуска команды.
	 *
	 * @type {CallableFunction}
	 * @param {SlashCommandRunOptions} options Параметры переданные для запуска команды
	 * @returns {Promise<unknown>}
	 */
	run: (options: SlashCommandRunOptions) => Promise<unknown>;
}

/**
 * Слеш команда.
 *
 * ---
 * @example
 * ```ts
 * const command = new SlashCommand({
 *      name: "ping",
 *      description: "Currently ping",
 *
 *      run: async ({ interaction }) => {
 *          return await interaction.reply("Pong!")
 *      }
 * });
 * ```
 * ---
 *
 * @class
 * @implements {SlashCommandStructureOptions}
 */
export class SlashCommand implements SlashCommandStructureOptions {
	public name!: string;
	public description!: string;
	public options?: ApplicationCommandOptionData[] = [];

	public userIDs?: string[] = [];
	public permissions?: PermissionResolvable[] = [];
	public runInDM?: boolean = false;
	public nsfwOnly?: boolean = false;
	public devOnly?: boolean = false;

	public readonly run: (options: SlashCommandRunOptions) => Promise<unknown> = async () => {
		throw new Error(`У слеш команды ${this.name} нет функции для запуска!`);
	};

	constructor(options: SlashCommandStructureOptions) {
		if (!options.name) throw new Error(`[${__filename}]: У слеш команды нет имени!`);
		if (!options.description) throw new Error(`У слеш команды ${this.name} нет описания!`);

		Object.assign(this, options);
	}
}
