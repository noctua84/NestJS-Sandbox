module.exports = async ({ github, prNumber, owner, repo }) => {
  const pr = await github.rest.pulls.get({
    owner: owner,
    repo: repo,
    pull_number: prNumber,
  });

  const combinedStatus = await github.rest.repos.getCombinedStatusForRef({
    owner: owner,
    repo: repo,
    ref: pr.data.head.sha,
  });

  const isPending = combinedStatus.data.statuses.some((status) => status.state === 'pending');
  const isFailure = combinedStatus.data.statuses.some((status) => status.state === 'failure');

  return {
    isPending,
    isFailure,
  }
}