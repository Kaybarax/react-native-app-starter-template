//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

//this one for aid during dev to see your content borders
export const BlockPartitionsDisplayCN = {
  // borderStyle: 'solid',
  // borderWidth: 1,
  // borderColor: '#152939',
};

//containers
//start flex containers
export const FlexRowContainerCN = {
  display: "flex" as const,
  flex: 1,
  flexDirection: 'row' as const,
  padding: 2,
  width: '100%' as const,
  ...BlockPartitionsDisplayCN,
};

export const FlexFluidRowContainerCN = {
  display: "flex" as const,
  flex: 1,
  flexDirection: 'row' as const,
  flexWrap: 'wrap' as const,
  padding: 2,
  width: '100%' as const,
  ...BlockPartitionsDisplayCN,
};

export const FlexColumnContainerCN = {
  display: "flex" as const,
  flex: 1,
  flexDirection: 'column' as const,
  padding: 2,
  width: '100%' as const,
  ...BlockPartitionsDisplayCN,
};

export const FlexFluidColumnContainerCN = {
  display: "flex" as const,
  flex: 1,
  flexDirection: 'column' as const,
  flexWrap: 'wrap' as const,
  padding: 2,
  width: '100%' as const,
  ...BlockPartitionsDisplayCN,
};
// end flex containers

//start flex container children
export const FlexContainerChildrenGapCN = {
  flex: 1,
  margin: 2, // and that, will result in a 4 points dimensions gap
  ...BlockPartitionsDisplayCN,
};

export const FlexContainerChildItemCN = {
  padding: 2,
  flexGrow: 1,
  ...BlockPartitionsDisplayCN,
};

export const FlexContainerChildItemNoGrowCN = {
  padding: 2,
  flexGrow: 0,
  ...BlockPartitionsDisplayCN,
};

export const FlexContainerChildItemFullWidthCN = {
  flexBasis: '100%' as const,
  padding: 2,
  ...BlockPartitionsDisplayCN,
};

export const FlexContainerChildItemThreeQuartersWidthCN = {
  flexBasis: '75%' as const,
  padding: 2,
  ...BlockPartitionsDisplayCN,
};

export const FlexContainerChildItemOneHalfWidthCN = {
  flexBasis: '50%' as const,
  padding: 2,
  ...BlockPartitionsDisplayCN,
};

export const FlexContainerChildItemOneQuarterWidthCN = {
  flexBasis: '25%' as const,
  padding: 2,
  ...BlockPartitionsDisplayCN,
};

export const FlexContainerChildItemOneThirdWidthCN = {
  flexBasis: '33.33%' as const,
  padding: 2,
  ...BlockPartitionsDisplayCN,
};

export const FlexContainerChildItemWidthCN = (width: string) => ({
  flexBasis: width as any,
  padding: 2,
  ...BlockPartitionsDisplayCN,
});
// end flex container children

// start flex container content alignments
export const AlignCenterContentCN = {
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  ...BlockPartitionsDisplayCN,
};

export const AlignRightFlexContainerContentCN = {
  alignItems: 'flex-end' as const,
  justifyContent: 'flex-end' as const,
  ...BlockPartitionsDisplayCN,
};

export const AlignRightTextCN = {
  textAlign: 'right' as const,
  alignItems: 'flex-end' as const,
  justifyContent: 'flex-end' as const,
  ...BlockPartitionsDisplayCN,
};

export const AlignCenterTextCN = {
  textAlign: 'center' as const,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
  ...BlockPartitionsDisplayCN,
};

export const AlignLeftFlexContainerContentCN = {
  alignItems: 'flex-start' as const,
  justifyContent: 'flex-start' as const,
  ...BlockPartitionsDisplayCN,
};

export const AlignLeftTextCN = {
  textAlign: 'left' as const,
  alignItems: 'flex-start' as const,
  justifyContent: 'flex-start' as const,
  ...BlockPartitionsDisplayCN,
};
// end flex container content alignments
