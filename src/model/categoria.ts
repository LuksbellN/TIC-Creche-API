export class Categoria{
    private id_categoria: number
    private desc_categoria: string

    constructor(id_categoria: number, desc_categoria: string){
        this.id_categoria = id_categoria
        this.desc_categoria = desc_categoria
    }

    setId(id_categoria: number){
        this.id_categoria = id_categoria
    }

    getId(): number{
        return this.id_categoria
    }

    setDesc(desc_categoria: string){
        this.desc_categoria = desc_categoria
    }

    getDesc(): string{
        return this.desc_categoria
    }

    toString(): string{
        return ` O id da categoria é: ${this.id_categoria} \n O nome da categoria é: ${this.desc_categoria}`
    }
}