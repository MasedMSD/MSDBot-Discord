import { PermissionResolvable, AnySelectMenuInteraction } from "discord.js";
import { Core } from "../Core";

/**
 * Структура функции для запуска выпадающего списка
 *
 * @interface
 */
interface SelectMenuRunOptions {
	/**
	 * Клиент.
	 *
	 * @type {Core}
	 */
	client: Core;

	/**
	 * Взаимодействие с выпадающим списком
	 *
	 * @type {AnySelectMenuInteraction}
	 */
	interaction: AnySelectMenuInteraction;

	/**
	 * Сам выпадающий список.
	 *
	 * @type {SelectMenuStructureOptions}
	 */
	structure: SelectMenuStructureOptions;
}

/**
 * Структура выпадающего списка
 *
 * @interface
 */
interface SelectMenuStructureOptions {
	/**
	 * Имя выпадающего списка. Должно быть как customID у interaction
	 *
	 * @type {string}
	 */
	name: string;

	/**
	 * Массив строк с айди серверов в которых можно использовать данный выпадающий список.
	 *
	 * @type {string[]}
	 */
	guildIDs?: string[];

	/**
	 * Массив строк с айди пользователей которые могут использовать данный выпадающий список.
	 *
	 * @type {string[]}
	 */
	userIDs?: string[];

	/**
	 * Массив с разрешениями для использования этого выпадающего списка.
	 *
	 * @type {PermissionResolvable[]}
	 */
	permissions?: PermissionResolvable[];

	/**
	 * Должен ли данный выпадающий список запускаться в личных сообщениях.
	 *
	 * @type {boolean}
	 */
	runInDM?: boolean;

	/**
	 * Должен ли этот выпадающий список запускаться в канале с пометкой NSFW.
	 *
	 * @type {boolean}
	 */
	nsfwOnly?: boolean;

	/**
	 * Должен ли этот выпадающий список использовать только разработчик.
	 *
	 * @type {boolean}
	 */
	devOnly?: boolean;

	/**
	 * Функция для запуска выпадающего списка.
	 *
	 * @type {CallableFunction}
	 * @param {SelectMenuRunOptions} options Параметры переданные для запуска выпадающего списка
	 * @returns {Promise<unknown>}
	 */
	run: (options: SelectMenuRunOptions) => Promise<unknown>;
}

/**
 * Кнопка.
 *
 * ---
 * @example
 * ```ts
 * const dropdown = new SelectMenu({
 *      name: "ping",
 *
 *      run: async ({ interaction }) => {
 *          return await interaction.reply("Pong!")
 *      }
 * });
 * ```
 * ---
 *
 * @class
 * @implements {SelectMenuStructureOptions}
 */
export class SelectMenu implements SelectMenuStructureOptions {
	public name!: string;

	public guildIDs?: string[] = [];
	public userIDs?: string[] = [];
	public permissions?: PermissionResolvable[] = [];
	public runInDM?: boolean = false;
	public nsfwOnly?: boolean = false;
	public devOnly?: boolean = false;

	public readonly run: (options: SelectMenuRunOptions) => Promise<unknown> = async () => {
		throw new Error(`У выпадающего списка ${this.name} нет функции для запуска!`);
	};

	constructor(options: SelectMenuStructureOptions) {
		if (!options.name) throw new Error(`[${__filename}]: У выпадающего списка нет имени!`);

		Object.assign(this, options);
	}
}
