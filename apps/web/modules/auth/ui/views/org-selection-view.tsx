import { OrganizationList } from '@clerk/nextjs';

export default function OrgSelectionView() {
  return (
    <div>
      <OrganizationList
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        hidePersonal
        skipInvitationScreen
      />
    </div>
  );
}
