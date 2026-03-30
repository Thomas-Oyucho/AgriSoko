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
    weight_size?: string | null;
    unit?: string | null;
    allow_farm_visits: boolean;
    picture?: string | null;
    description?: string | null;
    date_listed: string;
    category: ProduceCategory;
}
