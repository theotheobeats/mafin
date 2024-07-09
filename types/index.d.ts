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
};

declare type Transaction = {
	id: bigint;
	name: bigint;
	amount: number;
	type_id: bigint;
	category_id: bigint;
	userId: bigint;
	categories: Category;
	type: Type;
};

type FlattenedTransaction = {
	id: bigint;
	name: string;
	amount: number;
	type: string;
	category: string;
};
