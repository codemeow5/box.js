import _ from 'lodash';

export default class Box{
    constructor(renderOrElement){
        if(typeof renderOrElement == 'function'){
            this.isElement = false;
            this.render = renderOrElement;
        } else {
            this.isElement = true;
            this.element = renderOrElement;
        }
        this.mount = false;
        this.scene = null;
        this.paths = [];
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.show_ = true;
    }

    _include(x, y){
        if(!this.show_){
            return false;
        }
        if(this.mount){
            for(var i in this.paths){
                let [include, path] = this.paths[i];
                if(this.scene.ctx.isPointInPath(path, x, y)){
                    return include;
                }
            }
        } else {
            return false;
        }
    }

    _removePosition(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    setPosition(x, y, z = 0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    show(){
        this.show_ = true;
        if(this.mount){
            this.scene.render();
        }
    }

    hide(){
        this.show_ = false;
        if(this.mount){
            this.scene.render();
        }
    }

    // events

    onMouseUp(e, x, y){
        // override it
    }

    onMouseDown(e, x, y){
        // override it
    }

    onMouseOver(e, x, y){
        // override it
    }

    onMouseOut(e, x, y){
        // override it
    }

}