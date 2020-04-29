import { NextPage } from "next";
import Head from "next/head";

import { Heading, List, ListItem, Stack, Text } from "@chakra-ui/core";

const ProjectPage: NextPage = () => {
  return (
    <>
      <Head key={1}>
        <title>Project</title>
      </Head>
      <Stack paddingLeft="35px" paddingRight="35px" fontSize="1.3rem">
        <Heading as="h1" padding="20px">
          Comunidades de práctica como fomento del aprendizaje colaborativo y la
          vinculación con la sociedad de los estudiantes de Ingeniería Civil en
          Informática.
        </Heading>
        <Text paddingBottom="20px" fontStyle="italic" fontWeight="bold">
          DACIC - Innoving 2030
        </Text>

        <Text textAlign="justify">
          La sociedad actual atraviesa periodos de resignificación que imponen a
          los nuevos profesionales habilidades de adaptación continua al cambio,
          tanto técnicos como sociales, y participación activa en el proceso de
          construcción de las normas y saberes que tomarán parte activa de en
          cada periodo.
        </Text>
        <Text textAlign="justify">
          Por lo tanto, se propone la construcción de comunidades de práctica
          que promuevan el aprendizaje colaborativo a través de la práctica y
          con significación dada por la vinculación directa con la sociedad y,
          con ello, contribuir con la autonomía y liderazgo de los estudiantes
          de Ingeniería Civil en Informática de cara a su desarrollo profesional
          tanto dentro como fuera del aula y a su inserción en el mundo laboral,
          dinámico y turbulento.
        </Text>
        <Text>Para ello, se propone</Text>
        <List as="ol" styleType="decimal" spacing="10px">
          <ListItem>
            Diseñar un concurso abierto a estudiantes de Ingeniería Civil en
            Informática, que les provea de fondos para la conformación y
            autogestión de comunidades de práctica en torno a tecnologías
            altamente demandadas en la industria tecnológica chilena y mundial,
            considerando criterios de intergeneracionales, vinculación con la
            sociedad, planificación, difusión de resultados y equidad de género;
          </ListItem>
          <ListItem>
            Implementar las comunidades de práctica de los equipos ganadores del
            concurso, brindando apoyo continuo tanto en la gestión como en el
            vínculo con expertos, sociedad civil, espacio físico y equipamiento;
            y
          </ListItem>
          <ListItem>
            Evaluar los resultados de la conformación de las comunidades de
            práctica, revisando los productos tecnológicos desarrollados en su
            vinculación práctica con la sociedad, productos educativos que
            aseguren la generación de conocimiento y productos de gestión que
            aseguren la sustentabilidad de la comunidad en el tiempo.
          </ListItem>
        </List>
      </Stack>
    </>
  );
};

export default ProjectPage;
