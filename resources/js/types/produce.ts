export interface ProduceCategory {
    id: number;
    category_name: string;
    description?: string;
}

export interface Produce {
    id: number;
    farmer_id: number;
    category_id: number;
    name: string;
    price: number;
    quantity_available: number;
    stock_unit?: string | null;
    price_unit?: string | null;
    picture?: string | null;
    description?: string | null;
    allow_farm_visits: boolean;
    date_listed: string;
    category: ProduceCategory;
}
