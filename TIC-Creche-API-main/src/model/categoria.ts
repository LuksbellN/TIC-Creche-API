export class Categoria{
    //#region Propriedades
    private id_categoria: number
    private desc_categoria: string
    //#endregion

    //#region Construtor
    constructor(id_categoria: number, desc_categoria: string){
        this.id_categoria = id_categoria
        this.desc_categoria = desc_categoria
    }
    //#endregion

    //#region Gets
    getId(): number{ return this.id_categoria };
    getDesc(): string{ return this.desc_categoria }
    //#endregion
    
    //#region Sets
    setDesc(desc_categoria: string){
        this.desc_categoria = desc_categoria
    }
    //#endregion

    //#region Metodos

    toString(): string{
        return ` O id da categoria é: ${this.id_categoria} \n O nome da categoria é: ${this.desc_categoria}`
    }

    //#endregion
    
    }