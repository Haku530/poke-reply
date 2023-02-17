import { Context } from 'koishi';
import { Schema } from 'koishi';
interface PokeReplyConfig {
    replies?: string[];
    pokeBack?: boolean;
    pokeProb?: number;
}
export declare const Config: Schema<PokeReplyConfig>;
export declare const name = "poke-reply";
export declare function apply(ctx: Context, config: PokeReplyConfig): void;
export {};
