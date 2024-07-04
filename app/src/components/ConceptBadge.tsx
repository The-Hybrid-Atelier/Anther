import { motion } from "framer-motion";
import { Button } from "@mantine/core";
import { titleCase } from "../helpers.ts";
import { ConceptPoint } from "../main.tsx";

interface ConceptBadgeProps {
  concept: ConceptPoint;
  domains: string[];
  open: () => void;
  setModalSelection: (selection: {
    concept: ConceptPoint;
    domains: string[];
  }) => void;
}

function ConceptBadge({
  concept,
  domains,
  open,
  setModalSelection,
}: ConceptBadgeProps) {
  function handleClick() {
    setModalSelection({ concept: concept, domains: domains });
    open();
  }

  return concept.x && concept.y ? (
    <motion.div
      initial={{ scale: 0, top: "50%", left: "50%", opacity: 0 }}
      whileHover={{ scale: 1.1, zIndex: 100 }}
      animate={{
        scale: 1,
        opacity: 1,
        position: "absolute",
        left: concept.x && concept.x < 0.5 ? `${concept.x * 100}%` : "",
        right: concept.x && concept.x >= 0.5 ? `${(1 - concept.x) * 100}%` : "",
        top: concept.y && concept.y < 0.5 ? `${concept.y * 100}%` : "",
        bottom:
          concept.y && concept.y >= 0.5 ? `${(1 - concept.y) * 100}%` : "",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 50,
        duration: 0.2,
      }}
      style={{ position: "absolute" }}
      onClick={() => handleClick()}
    >
      <Button
        radius={"xl"}
        size={"sm"}
        variant={"light"}
        color={concept.color ?? "blue"}
        compact
        onClick={() => open()}
      >
        {titleCase(concept.token)}
      </Button>
    </motion.div>
  ) : (
    ""
  );
}

export default ConceptBadge;
