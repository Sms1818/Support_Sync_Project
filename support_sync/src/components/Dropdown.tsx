import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export default function DropDown() {
  const ticketingPlatforms = [
    { key: "jira", label: "Jira" },
    { key: "github", label: "GitHub" },
    { key: "zendesk", label: "Zendesk" },
    { key: "trello", label: "Trello" },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize">Select Ticketing Platform</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Ticketing Platforms">
        {ticketingPlatforms.map((platform) => (
          <DropdownItem key={platform.key} onClick={() => console.log(platform.label)}>
            {platform.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
