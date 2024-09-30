import {
  Box,
  Grid,
  Input,
  Loader,
  SegmentedControl,
  Select,
  Stack,
} from "@mantine/core";
import { AppShellContainer } from "./Header";
import React from "react";
import { MagnifyingGlass } from "phosphor-react";

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  sortOptions1: SelectOption[];
  sortOptions2: SelectOption[];
  sortOptions3: SelectOption[];
  segmentControl: SelectOption[];
  sortPlaceholder1: string;
  sortPlaceholder2: string;
  sortPlaceholder3: string;
  disable?: boolean;
  searchPlaceholder: string;
  onSortByChange1: (value: string) => void;
  onSortByChange2: (value: string) => void;
  onSortByChange3: (value: string) => void;
  onSegmentControl: (value: string) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  visible: boolean;
  colorScheme: "dark" | "light"; // Add colorScheme to props
}

export const AppShellComponents: React.FC<Props> = ({
  sortOptions1,
  sortOptions2,
  sortOptions3,
  searchPlaceholder,
  sortPlaceholder1,
  sortPlaceholder2,
  sortPlaceholder3,
  disable,
  segmentControl,
  onSegmentControl,

  onSortByChange1,
  onSortByChange2,
  onSortByChange3,
  onSearchChange,
  visible,
  colorScheme,
}) => {
  const backgroundColor = colorScheme === "dark" ? "#0A0E14" : "#F2E2D4";

  return (
    <AppShellContainer>
      <Stack>
        <Box my={16} style={{ backgroundColor }}>
          <Grid.Col span={6}>
            <SegmentedControl
              fullWidth
              data={segmentControl}
              onChange={onSegmentControl}
              style={{ backgroundColor }}
            />
          </Grid.Col>
          <Grid.Col span={10}>
            <Input.Wrapper id="input-demo" label="Search" size="xs">
              <Input
                icon={<MagnifyingGlass size={32} />}
                placeholder={searchPlaceholder}
                // value={searchTerm}
                onChange={onSearchChange}
                rightSection={visible && <Loader size="xs" />}
                size="xs"
                style={{ backgroundColor }}
              />
            </Input.Wrapper>
          </Grid.Col>
        </Box>
      </Stack>
      <Box my={12} style={{ backgroundColor }}>
        <Grid>
          <Grid.Col span={4}>
            <Select
              size="sm"
              label="Sort by"
              placeholder={sortPlaceholder1}
              // value={sortBy1}
              onChange={onSortByChange1}
              data={sortOptions1}
              style={{ backgroundColor }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              size="sm"
              label="Order"
              placeholder={sortPlaceholder2}
              // value={sortBy2}
              onChange={onSortByChange2}
              data={sortOptions2}
              style={{ backgroundColor }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              size="sm"
              label="Order"
              placeholder={sortPlaceholder3}
              // value={sortBy3}
              onChange={onSortByChange3}
              data={sortOptions3}
              style={{ backgroundColor }}
            />
          </Grid.Col>
        </Grid>
      </Box>
    </AppShellContainer>
  );
};
