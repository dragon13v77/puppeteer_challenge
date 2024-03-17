export interface ProductItem {
    title: string;
    description?: string;
    priceAmount?: string;
    priceCurrency?: string;
    imageUrl?: string;
    link?: string;
    options?: VariationOption[][];
}

export interface VariationOption {
    id: string;
    value: string;
}

export interface Country {
    id: number;
    name: string;
}

export interface GuestUser {
    email: string;
    country: Country;
    fullName: string;
    streetAddress: string;
    flat?: string;
    postalCode?: string;
    city: string;
    phoneNumber?: string;
}