declare type Category = {
	id: bigint;
	name: string;
};

declare type Type = {
	id: bigint;
	name: string;
};

declare type TransactionColumnProps = {
	id: bigint;
	name: string;
	amount: number;
	type: string;
	category: string;
	date: Date;
};

declare type Transaction = {
	id: bigint;
	name: string;
	amount: number;
	type_id: bigint;
	category_id: bigint;
	userId: bigint;
	categories: Category;
	types: Type;
};

declare type SingleTransaction = {
	id: bigint;
	name: string;
	amount: number;
	type_id: bigint;
	category_id: bigint;
	userId: bigint;
};

declare type FlattenedTransaction = {
	id: bigint;
	name: string;
	amount: number;
	type_id: bigint;
	category_id: bigint;
	type: string;
	category: string;
};