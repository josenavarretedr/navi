<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col cols="10" class="mt-5">
        <div id="quote">
          <p class="quoteText">
            "{{selectQuote.quote}}"
            <!-- "{{frases[Math.floor(Math.random()*frases.lenght)].quote}}" -->
          </p>
          <p class="author"> - {{selectQuote.author}}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        frases: [
          {
            quote: 'Una gran persona atrae a grandes personas y sabe cómo mantenerlas juntas',
            author: 'Johann Wolfgang von Goethe'
          },
          {
            quote: 'El buen líder sabe lo que es verdad; el mal líder sabe lo que se vende mejor',
            author: 'Confucio'
          },
          {
            quote: 'Cualquiera puede sostener el timón cuando el mar está en calma',
            author: 'Publilio Siro'
          },
          {
            quote: 'La cualidad suprema del liderazgo es la integridad',
            author: 'Dwight Eisenhower'
          },
          {
            quote: 'El arte de la comunicación es el lenguaje del liderazgo',
            author: 'James Humes'
          },
          {
            quote: 'Un buen líder no se queda atascado detrás de su escritorio',
            author: 'Richard Branson',
          },
          {
            quote: 'El ejemplo no es lo principal para influenciar a otros. Es la única cosa',
            author: 'Albert Schweitzer',
          },
          {
            quote: 'Un buen líder no es un buscador de consensos, sino un moldeador de consensos ',
            author: 'Martin Luther King',
          },
          {
            quote: 'Liderazgo y aprendizaje son indispensables el uno para el otro',
            author: 'John F. Kennedy'
          },
          {
            quote: 'El pesimista se queja del viento. El optimista espera que cambie. El líder arregla las velas',
            author: 'John Maxwell',
          },
          {
            quote: 'Si tus acciones inspiran a otros a soñar más, aprender más, hacer más y ser más, eres un líder',
            author: 'John Quincy Adams',
          },
          {
            quote: 'Cree que puedes y casi lo habrás logrado ',
            author: 'Theodore Roosevelt',
          },
          {
            quote: 'Si tienes un sueño y crees en él, corres el riesgo de que se convierta en realidad',
            author: 'Walt Disney'
          },
          {
            quote: 'El hombre que mueve montañas comienza cargando pequeñas piedras',
            author: 'Confucio'
          },
          {
            quote: 'Entrega siempre más de lo que esperan de ti',
            author: 'Larry Page'
          }
        ]
      }
    },
    computed: {
      selectQuote() {
        let numberRan = Math.floor(Math.random()*this.frases.length)
        return this.frases[numberRan]
      }
    },
  }

</script>

<style lang="scss" scoped>
  #quote{
    border-left: solid 15px grey;
    padding-left: 2rem;
  }

  .quoteText{
    font-size: 2.5rem;
    font-weight:500;
    text-align: justify;
  }

  .author{
    font-size: 1.7rem;
    text-align: right;
    font-weight: 300;
  }
</style>
