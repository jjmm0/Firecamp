<template>
  <div class="container">
      <div class="text">
        <h1>duzy tekst xd</h1><br/>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </div>
      
      <div class="accbuttons">
        <div>
          <nuxt-link to="/loginPage">
            <div class="lbutton">
              <b><a class="buttontext">Client</a></b>
            </div>
          </nuxt-link>
        </div>
        
        <div>
          <nuxt-link to="/loginPage">
            <div class="rbutton">
              <b><a class="buttontext">Login/register as a helper</a></b>
            </div>
          </nuxt-link>
        </div>
      </div>


      <table class="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style scoped>
    @import '~/assets/style/mainsite/style.css';
</style>
