import { NextPage } from "next";
import Head from "next/head";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/core";

const FAQPage: NextPage = () => {
  return (
    <>
      <Head key={1}>
        <title>Preguntas frecuentes</title>
      </Head>
      <Stack marginTop="20px" paddingLeft="25px" paddingRight="25px">
        <Heading paddingBottom="20px">Preguntas frecuentes</Heading>
        <Accordion defaultIndex={-1} allowMultiple={false}>
          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por comunidad de práctica?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por comunidades de práctica a los grupos de
                personas que comparten la motivación por desarrollar
                aprendizajes y experiencias en torno a temas de su interés y
                favoreciendo las habilidades que se poseen o que se desean
                desarrollar.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por territorio?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por territorio a un espacio geográfico local donde
                interactúan un conjunto de individuos de manera directa y que
                conforman una cultura local.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por software territorial?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por software territorial aquel que responde a un
                problema u oportunidad identificada en el territorio que
                beneficia al grupo de individuos que conforman ese espacio
                social.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por contexto territorial?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por contexto territorial al ambiente en el cual se
                sucede el problema u oportunidad identificada, caracterizado,
                generalmente, por los interesados, beneficiarios, tecnologías,
                procesos, políticas, leyes o cualquier otra instancia que se
                encuentre inflenciada o se vea influenciada por el problema u
                oportunidad identificada.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por pertinencia de la tecnología?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por pertinencia de la tecnología la coherencia que
                tendrá con las características del problema u oportunidad
                identificada.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por factibilidad de la tecnología?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por factibilidad de la tecnología a la capacidad de
                desarrollar el software territorial a través de ella,
                considerando los recursos económicos, temporales y humanos con
                los que cuenta la comunidad postulante, así como con las
                restricciones legales, ambientales y éticas del contexto
                territorial.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por relevancia de la tecnología?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por relevancia de la tecnología a la penetración
                que tiene en el mercado laboral dentro de la industria del
                software nacional y/o internacional.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Cómo podemos describir las habilidades individuales de los
                miembros del equipo?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se podrán describir todas las habilidades individuales de cada
                miembro de la comunidad postulante a través de una lista o
                párrafo donde se enuncien las experiencias previas en cualquier
                ámbito de realización personal.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por beneficios del trabajo en comunidad?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por beneficios del trabajo en comunidad a todas
                aquellas características organizacionales, de aprendizaje o
                desarrollo que superan las habilidades individuales de cada uno
                de los miembros.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por objetivo de aprendizaje?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por objetivo de aprendizaje a las metas que
                establece la comunidad postulante en cuanto a lo que desea
                aprender durante su proceso de formación dentro del contexto
                territorial
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por objetivo de desarrollo?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por objetivo de desarrollo a las metas que
                establece la comunidad postulante en cuanto a lo que desea
                desarrollar durante su proceso de formación dentro del contexto
                territorial.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué se entiende por estrategia de organización?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Se entenderá por estrategia de organización a las actividades
                diarias, semanales y/o mensuales que permiten a los miembros de
                la comunidad postulante alcanzar sus metas generales, de
                aprendizaje y de desarrollo establecidas.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué sucede si, de adjudicarnos los fondos, necesitamos
                modificar la tecnología?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Es un proceso normal en proyectos experimentales la necesidad de
                probar de manera rápida tecnologías y aprender que la tecnología
                seleccionada no ha sido la correcta y, por tanto, redirigir el
                rumbo. Por lo que es factible modificar la tecnología, siempre
                con la aprobación del equipo directivo del proyecto PIDU.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué sucede si, de adjudicarnos los fondos, necesitamos
                modificar los objetivos de aprendizaje y/o desarrollo?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Es un proceso normal en proyectos experimentales la necesidad de
                modificar las metas debido a que no ha sido las correcta y, por
                tanto, redirigir el rumbo. Por lo que es factible modificar los
                objetivos, siempre con la aprobación del equipo directivo del
                proyecto PIDU.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Heading fontSize="1.5em" as="h2">
                ¿Qué sucede si, de adjudicarnos los fondos, necesitamos
                modificar la estrategia de organización?
              </Heading>
            </AccordionHeader>
            <AccordionPanel>
              <Text>
                Es un proceso normal en proyectos experimentales la necesidad de
                modificar las estrategias de organización para alcanzar las
                metas debido al proceso de ajuste de los miembros de la
                comunidad y, por tanto, redirigir el rumbo. Por lo que es
                factible modificar las estrategias, siempre con la aprobación
                del equipo directivo del proyecto PIDU.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </>
  );
};

export default FAQPage;
