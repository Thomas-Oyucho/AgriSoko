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
    picture?: string | null;
    description?: string | null;
    date_listed: string;
    weight_size: string;
    unit: string;
    allow_farm_visits: boolean;
    category: ProduceCategory;
}
