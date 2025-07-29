export interface IngredientData {
  id: string;
  name: string;
}

export class Ingredient implements IngredientData {
  id: string;
  name: string;

  constructor(data: IngredientData) {
    this.id = data.id;
    this.name = data.name;
  }

  static fromJSON(data: IngredientData): Ingredient {
    return new Ingredient(data);
  }
}