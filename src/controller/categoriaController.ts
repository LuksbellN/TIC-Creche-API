export class categoriaController{


    public static index(request, reply){
        
        let str: string = `Categorias`;
        reply.send(str);
    }

}

