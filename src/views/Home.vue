<template>
  <div class="home">
    
    <div v-if="!gerado">
      <h3>Construir Formulário</h3>
      <div class="input-group">
        <button
          @click.prevent="addForm()"
          class="btn btn-success bg-green mt-2"
          style="margin: 0 auto"
          type="submit"
        >
          <span>+ Adicionar Campo</span>
        </button>
        <button
        :disabled="btnList.length>=3"
          @click.prevent="addButton()"
          class="btn btn-success bg-green mt-2"
          style="margin: 0 auto"
          type="submit"
        >
          <span>+ Adicionar Botão</span>
        </button>
      </div>
      <h4>Formulários</h4>
      <hr>
      <div
        v-for="(form, index) in formList"
        :key="form.id"
      >
        <div  class="row">  
          <h5 class="col-sm- ml-4">
            <span class="label label-default">
              <p>{{index+1}}-</p>
            </span>
          </h5>
          <input
            type="text"
            class="form-control mt-2 ml-4 mr-4 col"
            placeholder="Nome do Campo"
            v-model="form.nome"
          >
          <input
            type="text"
            class="form-control mt-2 ml-4 mr-4 col"
            placeholder="Label"
            v-model="form.label"
          >
          <div class="col">
            <div class="form-check text-left font-weight-bold mt-1">
              <input class="form-check-input mt-2" id='mascara' type="checkbox"
                @click="checkMasc(index)"
                :disabled="mascara!=='' && mascara!==form.id"
                value v-model="form.mascara"
              >
              <label class="form-check-label" for="mascara">
                Máscara de telefone?
              </label>
            </div>
            <div class="form-check text-left font-weight-bold mt-1">
              <input class="form-check-input mt-2" id='obrigatorio' type="checkbox" value v-model="form.obrigatorio">
              <label class="form-check-label" for="obrigatorio">
                Obrigatório?
              </label>
            </div>
          </div>
          <div class="col">
            <button type="button" class="btn btn-danger"
              @click="removeForm(index)"
            >
              <fa icon="trash" />
            </button>
          </div>
        </div>
        <hr>
        <div class="mt-4 mb-4"></div>
      </div>
      <h4>Botões</h4>
      <hr>
      <div
        v-for="(btn, index) in btnList"
        :key="btn.id+'btn'"
      >
        <div  class="row">  
          <h5 class="col-sm- ml-4">
            <span class="label label-default">
              <p>{{index+1}}-</p>
            </span>
          </h5>
          <div class="col">
            <div class="form-check text-left font-weight-bold mt-1">
              <div>
                  <input type="color" id="head" name="head"
                        value v-model="btn.cor">
                  <label for="head">Cor</label>
              </div>
              <div>
                  <input type="color" id="head" name="head"
                        value v-model="btn.textColor">
                  <label for="head">Cor do Texto</label>
              </div>
            </div>
          </div>
          <input
            type="text"
            class="form-control mt-2 ml-4 mr-4 col"
            placeholder="Label"
            v-model="btn.label"
          >
          <h5>Função:</h5>
          <div class="col">
            <button
              class="mt-2 btn btn-secondary"
              type="submit"
              @click.prevent="selPraLink(index), $modal.show('linkmodal')"
              v-bind:class="{ 'btn-success': btn.funcao == 'AbrirLink','bg-green':btn.funcao == 'AbrirLink'}"
            >
              <span>Link</span>
            </button>
            <button
              class="ml-2 mt-2 btn btn-secondary"
              type="submit"
              @click.prevent="btn.funcao = 'MostrarDados'"
              v-bind:class="{ 'btn-success': btn.funcao == 'MostrarDados','bg-green':btn.funcao == 'MostrarDados'}"
            >
              <span>Dados</span>
            </button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-danger"
              @click="removeBtn(index)"
            >
              <fa icon="trash" />
            </button>
          </div>
        </div>
        <hr>
        <div class="mt-4 mb-4"></div>
      </div>

      <v-modal name="linkmodal"
        :width="250"
        :height="200"
      >
        <p>Insira o Link a ser aberto</p>
        <div>
          <input
            type="text"
            class="form-control mt-2"
            style="width:200;"
            placeholder="Link"
            v-model="btnLink"
          >
        </div>
        
        <div class="input-group">
          <button
            class="btn btn-success mt-2"
            style="margin: 0 auto"
            type="submit"
            @click.prevent="btnList[btnSel].link = btnLink,btnList[btnSel].funcao = 'AbrirLink',$modal.hide('linkmodal')"
          >
            <span>Confirmar</span>
          </button>
          <button
            class="btn btn-danger mt-2"
            style="margin: 0 auto"
            type="submit"
            @click.prevent="btnLink = '',$modal.hide('linkmodal')"
          >
            <span>Cancelar</span>
          </button>
        </div>
      </v-modal>
      <h4>Imagem de fundo</h4>
      <div class="d-flex justify-content-center">
        <div class="row" style="width:90%">
          <button class="col" style="border:1px solid black;width:25%;"
            @click.prevent="imgFundo 
              = 'https://images.unsplash.com/photo-1538991383142-36c4edeaffde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3902&q=80'">
            <div class="row">
              <img 
                src="https://images.unsplash.com/photo-1538991383142-36c4edeaffde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3902&q=80" 
                width="90%" height="90%"
                class="col"
              >
            </div>
            <input type="radio" disabled  id="image1" v-model="imgFundo" value="https://images.unsplash.com/photo-1538991383142-36c4edeaffde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3902&q=80">
          </button>
          <button class="col  ml-3" style="border:1px solid black;width:25%;"
            @click.prevent="imgFundo 
              = 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'">
            <div class="row">
              <img 
                src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80" 
                width="90%" height="90%"
                class="col"
              >
            </div>
            <input type="radio" id="image2" disabled v-model="imgFundo" value="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80">
          </button>
          <button class="col ml-3" style="border:1px solid black;width:25%;"
            @click.prevent="imgFundo 
              = 'https://images.unsplash.com/photo-1447966129673-88517d4367f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3775&q=80'">
            <div class="row">
              <img 
                src="https://images.unsplash.com/photo-1447966129673-88517d4367f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3775&q=80" 
                width="90%" height="90%"
                class="col"
              >
            </div>
            <input type="radio" id="image3" disabled
              v-model="imgFundo" value="https://images.unsplash.com/photo-1447966129673-88517d4367f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3775&q=80">
          </button>
        </div>
      </div>
      <hr>
      
      <div class="d-flex justify-content-center">
        <div class="row" style="width:90%">
          <button
            @click.prevent="gerar()"
            class="btn btn-success bg-green mt-2 btn-block col"
            style="margin: 0 auto"
            type="submit"
          >
            <span>Gerar Formulário</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else :style="{'background-image': 'url(' + imgFundo + ')'}">
      <h3>Formulário</h3>
      <div 
        v-for="(form) in formList"
        :key="form.id"
      >
        <div class="row">
          <div class="col">
            <h5 class="ml-4 text-left sm">
              <span class="label label-default text-left">
                  <p class="ext-left">{{form.label}}:</p>
              </span>
            </h5>
            <div class="d-flex justify-content-center">
              <input
                v-if="!form.mascara"
                type="text"
                class="form-control"
                style="width: 80%"
                :placeholder="form.nome"
                v-model="form.resposta"
                :required="form.obrigatorio ? true : false"
              >
              <the-mask
                v-else
                id="telefone"
                class="form-control"
                placeholder="(00) 00000-0000"
                style="width: 80%"
                :mask="['(##) ####-####', '(##) #####-####']"
                v-model="form.resposta"
                :required="form.obrigatorio ? true : false"
              />
            </div>
            <div class="d-flex justify-content-center">
              <p v-if="form.obrigatorio" class="col font-weight-light" style="color:red;">
                * Obrigatório
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="input-group">
        <button
          v-for="(btn) in btnList"
          :key="btn.id"
          class="btn mt-2"
          style="margin: 0 auto"
          v-bind:style="{ 'background-color': btn.cor, color: btn.textColor}"
          @click.prevent="trataEvento(btn)"
          type="submit"
        >
          <span>{{btn.label}}</span>
        </button>
      </div>
      <button
        @click.prevent="gerado = false"
        class="btn btn-success bg-green mt-2 p-2 mb-2"
        style="margin: 0 auto; width:10%;height:5%;align-self: start;font-size:2vw"
        type="submit"
      >
        <span>
          <fa icon="step-backward" /> Voltar
        </span>
      </button>
    </div>
    
    <v-modal name="dadosModal"
      :adaptive="true"
      :width="500"
      :height="500"
    >
      <div style="width: 100%;
        height: 100%;
        border: 1px dotted black;
        overflow: scroll"
      >
        <p>Dados inseridos</p>
        <div>
          <div v-for="(resp) in formList"
          :key="resp.id"
          class="row"
          >
            <div class="col">
              <h6 class="text-left ml-2 sm">{{resp.label}}:</h6>
              <p class="text-left ml-2">{{resp.resposta}}</p>
            </div>
            <hr>
          </div>

        </div>
        <button
          @click.prevent="$modal.hide('dadosModal')"
          class="btn btn-success bg-green mt-2 p-2 mb-2"
          style="margin: 0 auto;"
          type="submit"
        >
          <span>
            Ok
          </span>
        </button>
      </div>
    </v-modal>

  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      formList:[],
      btnList:[],
      mascara:'',
      btnSel:'',
      btnLink:'',
      gerado:false,
      imgFundo:''
    };
  },
  methods:{
    gerar(){
      if(this.formList.length == 0){
          return alert("Insira ao menos um formulário")
      }
      if(this.btnList.length == 0){
          return alert("Insira ao menos um Botão")
      }
      for (const formulario in this.formList) {
        if(this.formList[formulario].nome ===''){
          return alert("Existe(m) Formulário(s) sem Nome")
        }
        if(this.formList[formulario].label ===''){
          return alert("Existe(m) Formulário(s) sem Label")
        }
      }
      for (const button in this.btnList) {
        if(this.btnList[button].label ===''){
          return alert("Existe(m) Botão/Botões sem Label")
        }
        if(this.btnList[button].funcao ===''){
          return alert("Existe(m) Botão/Botões sem função")
        }
      }
      this.gerado = true;
    },
    selPraLink(index){
      this.btnSel = index;
      this.btnLink = this.btnList[index].link
    },
    addForm(){
      var id = 0;
      if(this.formList.length!=0){
        id = this.formList[this.formList.length-1].id+1
      }
      this.formList.push({
        'id':id,
        'nome':'',
        'label':'',
        'obrigatorio':false,
        'mascara':false,
      });
    },
    addButton(){
      var id = 0;
      if(this.btnList.length<3){
        if(this.btnList.length!=0){
          id = this.btnList[this.btnList.length-1].id+1
        }
        this.btnList.push({
          'id':id,
          'cor':"#e66465",
          'textColor':'#ffffff',
          'label':'',
          'funcao':'',
          'link':''
        });
      }
    },
    checkMasc(index){
      var item = this.formList[index];
      if(item.mascara){
        this.mascara = '';
      }else{
        this.mascara = item.id;
      }
    },
    removeForm(index){
      var item = this.formList[index];
      if(this.mascara ===item.id)
        this.mascara = '';

      this.formList.splice(index, 1);
    },
    removeBtn(index){
      this.btnList.splice(index, 1);
    },
    trataEvento(btn){
      for (const formulario in this.formList) {
        if(this.formList[formulario].obrigatorio && (
          this.formList[formulario].resposta === '' || this.formList[formulario].resposta === undefined)
        ){
          return alert("Existem Campos Obrigatórios não preenchidos")
        }
      }
      if(btn.funcao =='AbrirLink'){
          window.open(btn.link, "_blank");  
      }else{
        this.$modal.show('dadosModal')
      }
    }
  }
}
</script>
