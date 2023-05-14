import { ModalSubmitInteraction, PermissionResolvable } from "discord.js";
import { Core } from "../Core";

/**
 * Структура функции для запуска модального окна
 *
 * @interface
 */
interface ModalRunOptions {
	/**
	 * Клиент.
	 *
	 * @type {Core}
	 */
	client: Core;

	/**
	 * Взаимодействие с модальным окном
	 *
	 * @type {ModalSubmitInteraction}
	 */
	interaction: ModalSubmitInteraction;

	/**
	 * Само модальное окно.
	 *
	 * @type {ModalStructureOptions}
	 */
	structure: ModalStructureOptions;
}

/**
 * Структура модального окна
 *
 * @interface
 */
interface ModalStructureOptions {
	/**
	 * Имя модального окна. Должно быть как customID у interaction
	 *
	 * @type {string}
	 */
	name: string;

	/**
	 * Массив строк с айди серверов в которых можно использовать данное модальное окно.
	 *
	 * @type {string[]}
	 */
	guildIDs?: string[];

	/**
	 * Массив строк с айди пользователей которые могут использовать данное модальное окно.
	 *
	 * @type {string[]}
	 */
	userIDs?: string[];

	/**
	 * Массив с разрешениями для использования этого модального окна.
	 *
	 * @type {PermissionResolvable[]}
	 */
	permissions?: PermissionResolvable[];

	/**
	 * Должно ли данное модальное окно запускаться в личных сообщениях.
	 *
	 * @type {boolean}
	 */
	runInDM?: boolean;

	/**
	 * Должно ли данное модальное окно запускаться в канале с пометкой NSFW.
	 *
	 * @type {boolean}
	 */
	nsfwOnly?: boolean;

	/**
	 * Должен ли это модальное окно использовать только разработчик.
	 *
	 * @type {boolean}
	 */
	devOnly?: boolean;

	/**
	 * Функция для запуска модального окна.
	 *
	 * @type {CallableFunction}
	 * @param {ModalRunOptions} options Параметры переданные для запуска модального окна
	 * @returns {Promise<unknown>}
	 */
	run: (options: ModalRunOptions) => Promise<unknown>;
}

/**
 * Модальное окно.
 *
 * ---
 * @example
 * ```ts
 * const modal = new Modal({
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
 * @implements {ModalStructureOptions}
 */
export class Modal implements ModalStructureOptions {
	public name!: string;

	public guildIDs?: string[] = [];
	public userIDs?: string[] = [];
	public permissions?: PermissionResolvable[] = [];
	public runInDM?: boolean = false;
	public nsfwOnly?: boolean = false;
	public devOnly?: boolean = false;

	public readonly run: (options: ModalRunOptions) => Promise<unknown> = async () => {
		throw new Error(`У модального окна ${this.name} нет функции для запуска!`);
	};

	constructor(options: ModalStructureOptions) {
		if (!options.name) throw new Error(`[${__filename}]: У модального окна нет имени!`);

		Object.assign(this, options);
	}
}
