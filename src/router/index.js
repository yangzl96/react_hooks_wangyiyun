import React, { lazy } from 'react';
import { Redirect } from "react-router-dom";

// import ZLMine  from '../pages/mine'
// import ZLFriend  from '../pages/friend'
// import ZLPlayer  from '../pages/play'
// import ZLDiscover  from '../pages/discover'
// import ZYRecommend from '../pages/discover/c-pages/recommend'
// import ZYRanking from '../pages/discover/c-pages/ranking'
// import ZYSongs from '../pages/discover/c-pages/songs'
// import ZYDjradio from '../pages/discover/c-pages/djradio'
// import ZYArtist from '../pages/discover/c-pages/artist'
// import ZYAlbum from '../pages/discover/c-pages/album'
const ZLMine = React.lazy(_ => import("../pages/mine"));
const ZLFriend = React.lazy(_ => import("../pages/friend"));
const ZLDiscover = React.lazy(_ => import("../pages/discover"));
const ZYRecommend = React.lazy(_ => import("../pages/discover/c-pages/recommend"));
const ZYRanking = React.lazy(_ => import("../pages/discover/c-pages/ranking"));
const ZYSongs = React.lazy(_ => import("../pages/discover/c-pages/songs"));
const ZYDjradio = React.lazy(_ => import("../pages/discover/c-pages/djradio"));
const ZYArtist = React.lazy(_ => import("../pages/discover/c-pages/artist"));
const ZYAlbum = React.lazy(_ => import("../pages/discover/c-pages/album"));
const ZYPlayer = React.lazy(_ => import("../pages/play"));

const routes = [
  {
    path: '/',
    exact: true,
    render: () => (
      <Redirect to='/discover' />
    )
  },
  {
    path: '/discover',
    component: ZLDiscover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => (
          <Redirect to={"/discover/recommend"} />
        )
      },
      {
        path: "/discover/recommend",
        component: ZYRecommend
      },
      {
        path: "/discover/ranking",
        component: ZYRanking
      },
      {
        path: "/discover/songs",
        component: ZYSongs
      },
      {
        path: "/discover/djradio",
        exact: true,
        component: ZYDjradio
      },
      {
        path: "/discover/artist",
        component: ZYArtist
      },
      {
        path: "/discover/album",
        component: ZYAlbum
      },
      {
        path: "/discover/play",
        component: ZYPlayer
      }
    ]
  },
  {
    path: '/mine',
    component: ZLMine
  },
  {
    path: '/friend',
    component: ZLFriend
  }
]

export default routes