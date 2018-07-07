$(document).ready(function() {
  $("#searchUser").on('keyup', function(e) {
    let val = e.target.value;
    let url = "https://api.github.com/users/"+ val
    $.ajax({
      method:'get',
      url:  url,
      data: {
        client_id: '18163179777c01b49c88',
        client_secret: 'a083a4159149fb28e3600d824f368913bd18217f'
      }
    }).done(function(user) {
      $.ajax({
        url:"https://api.github.com/users/"+ val +"/repos",
        data: {
          client_id: '18163179777c01b49c88',
          client_secret: 'a083a4159149fb28e3600d824f368913bd18217f',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos) {
        console.log(repos);
        $.each(repos, function(i, repo) {
          $("#repos").append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="label label-danger">Public Repos: ${repo.forks_count}</span>
                  <span class="label mycolor">Public Gists: ${repo.watchers_count}</span>
                  <span class="label label-success">Followers: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $("#userProfile").html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-6">
                  <img class="thumbnail avatar" src="${user.avatar_url}">
                  <a class="btn btn-danger btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-6">
                <span class="label mycolor">Public Repos: ${user.public_repos}</span>
                <span class="label label-danger">Public Gists: ${user.public_gists}</span>
                <span class="label label-success">Followers: ${user.followers}</span>
                <span class="label label-info">Following: ${user.following}</span>
                <br><br>
                <ul class='list-group'>
                  <li class='list-group-item'>Company: ${user.company}</li>
                  <li class='list-group-item'>Blog: ${user.blog} </li>
                  <li class='list-group-item'>Location: ${user.location} </li>
                  <li class='list-group-item'>Email: ${user.email}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
      `)
    })
  });
});
