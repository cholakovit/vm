export interface ItemsProps {
  item: {
    name: string;
    price: number;
    number: number;
  },
  id: number;
}

export interface ItemProps {
  name: string;
  price: number;
  number: number;
}

export interface ButtonElements {
  buttonElReset: HTMLElement;
  buttonElEnter: HTMLElement;
}