/**
 * Drop into an Once UI project — NOT imported by the Vite app.
 * Parallel of MedicareCard using @once-ui-system/core primitives
 * (Background, Column, Heading, Input, Row, Text, IconButton)
 * in the same spirit as Once UI BankCard demos.
 *
 * Keep this file out of the Vite/tsc build (excluded via tsconfig).
 */
"use client";

import { useMemo, useState } from "react";
import {
  Background,
  Column,
  Heading,
  IconButton,
  Input,
  Row,
  Text,
} from "@once-ui-system/core";

// NOTE: CmsSeal / card face styles live in the Vite app.
// Copy src/CmsSeal.tsx + card CSS, or re-implement the face with Once UI tokens.
import { CmsSeal } from "./src/CmsSeal";
import { formatMedicareNumber } from "./src/formatMedicareNumber";

type MedicareCardData = {
  fullName: string;
  medicareNumber: string;
  partAStart: string;
  partBStart: string;
  entitledPartA: boolean;
  entitledPartB: boolean;
};

const DEFAULTS: MedicareCardData = {
  fullName: "JOHN L SMITH",
  medicareNumber: "1EG4-TE5-MK72",
  partAStart: "03-01-2016",
  partBStart: "03-01-2016",
  entitledPartA: true,
  entitledPartB: true,
};

export default function MedicareCardOnceUI() {
  const [data, setData] = useState<MedicareCardData>(DEFAULTS);

  const rows = useMemo(() => {
    const out: { label: string; date: string }[] = [];
    if (data.entitledPartA) {
      out.push({ label: "HOSPITAL (PART A)", date: data.partAStart || "—" });
    }
    if (data.entitledPartB) {
      out.push({ label: "MEDICAL (PART B)", date: data.partBStart || "—" });
    }
    return out;
  }, [data]);

  return (
    <Row
      fillWidth
      gap="32"
      padding="32"
      vertical="center"
      horizontal="center"
      style={{ background: "#ffffff", minHeight: "100vh" }}
      wrap
    >
      {/* Card preview — left / top */}
      <Column flex={1} maxWidth={32} style={{ minWidth: 280 }}>
        <Background
          border="neutral-alpha-weak"
          radius="l"
          shadow="xl"
          style={{
            aspectRatio: "1.586 / 1",
            overflow: "hidden",
            background: "#ffffff",
          }}
        >
          <Column
            fillWidth
            paddingX="16"
            paddingY="12"
            gap="8"
            style={{ background: "#0B2B5B" }}
          >
            <Row gap="12" vertical="center">
              <CmsSeal />
              <Heading as="h2" variant="heading-strong-s" onBackground="neutral-weak">
                <span style={{ color: "#fff" }}>MEDICARE HEALTH INSURANCE</span>
              </Heading>
            </Row>
          </Column>

          <Column fillWidth padding="16" gap="12" style={{ position: "relative" }}>
            <Text
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(-28deg)",
                opacity: 0.18,
                fontWeight: 800,
                fontSize: "3.5rem",
                pointerEvents: "none",
              }}
            >
              SAMPLE
            </Text>
            <Column gap="2">
              <Text variant="label-default-xs" style={{ color: "#0B2B5B" }}>
                Name/Nombre
              </Text>
              <Text variant="heading-strong-s">{data.fullName || "—"}</Text>
            </Column>
            <Column gap="2">
              <Text variant="label-default-xs" style={{ color: "#0B2B5B" }}>
                Medicare Number/Número de Medicare
              </Text>
              <Text variant="heading-strong-s">{data.medicareNumber || "—"}</Text>
            </Column>
            <Row gap="16" fillWidth>
              <Column flex={1} gap="2">
                <Text variant="label-default-xs" style={{ color: "#0B2B5B" }}>
                  Entitled to/Con derecho a
                </Text>
                {rows.map((r) => (
                  <Text key={r.label} variant="heading-strong-xs">
                    {r.label}
                  </Text>
                ))}
              </Column>
              <Column flex={1} gap="2">
                <Text variant="label-default-xs" style={{ color: "#0B2B5B" }}>
                  Coverage starts/Cobertura empieza
                </Text>
                {rows.map((r) => (
                  <Text key={`d-${r.label}`} variant="heading-strong-xs">
                    {r.date}
                  </Text>
                ))}
              </Column>
            </Row>
          </Column>

          <Background style={{ height: 14, background: "#C8102E" }} />
        </Background>
      </Column>

      {/* Form — right / bottom */}
      <Column flex={1} maxWidth={28} gap="16" style={{ minWidth: 280 }}>
        <Row horizontal="between" vertical="center">
          <Heading as="h3" variant="heading-strong-m">
            Fill in your Medicare card details
          </Heading>
          <IconButton
            icon="refresh"
            tooltip="Reset"
            variant="tertiary"
            onClick={() => setData(DEFAULTS)}
          />
        </Row>

        <Column gap="0" radius="l" border="neutral-alpha-medium" overflow="hidden">
          <Input
            id="fullName"
            label="Full name"
            value={data.fullName}
            onChange={(e) =>
              setData({ ...data, fullName: e.target.value.toUpperCase() })
            }
            radius="none"
          />
          <Input
            id="medicareNumber"
            label="Medicare number"
            value={data.medicareNumber}
            onChange={(e) =>
              setData({
                ...data,
                medicareNumber: formatMedicareNumber(e.target.value),
              })
            }
            radius="none"
          />
          <Row fillWidth>
            <Input
              id="partA"
              label="Part A start date"
              value={data.partAStart}
              onChange={(e) => setData({ ...data, partAStart: e.target.value })}
              radius="none"
              disabled={!data.entitledPartA}
            />
            <Input
              id="partB"
              label="Part B start date"
              value={data.partBStart}
              onChange={(e) => setData({ ...data, partBStart: e.target.value })}
              radius="none"
              disabled={!data.entitledPartB}
            />
          </Row>
        </Column>

        <Row gap="16" wrap>
          <label>
            <input
              type="checkbox"
              checked={data.entitledPartA}
              onChange={(e) =>
                setData({ ...data, entitledPartA: e.target.checked })
              }
            />{" "}
            Hospital (Part A)
          </label>
          <label>
            <input
              type="checkbox"
              checked={data.entitledPartB}
              onChange={(e) =>
                setData({ ...data, entitledPartB: e.target.checked })
              }
            />{" "}
            Medical (Part B)
          </label>
        </Row>
      </Column>
    </Row>
  );
}
